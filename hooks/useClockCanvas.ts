"use client";
import { useState, useEffect, useRef } from "react";
import { buildImageLayerUrls, CLOUDINARY_BASE } from "../utils/clockLayers";

// ─── Device-aware canvas size ─────────────────────────────────────────────────
// Desktop: 600px — sharp on retina
// Mobile:  360px — enough for display, saves ~60% memory per blob
function canvasWidth(): number {
  if (typeof window === "undefined") return 600;
  return window.innerWidth <= 768 ? 360 : 600;
}
const CANVAS_H_RATIO: Record<string, number> = { a: 1, b: 1, c: 9 / 16 };

// ─── Layer image cache ────────────────────────────────────────────────────────
const imgCache = new Map<string, HTMLImageElement>();

function loadImage(src: string): Promise<HTMLImageElement> {
  if (imgCache.has(src)) return Promise.resolve(imgCache.get(src)!);
  return new Promise((res, rej) => {
    const img = new window.Image();
    // crossOrigin anonymous for canvas — Cloudinary sends CORS headers by default.
    // If it fails (tainted canvas on some Android WebViews), we fall back without it.
    img.crossOrigin = "anonymous";
    img.onload  = () => { imgCache.set(src, img); res(img); };
    img.onerror = () => {
      // Fallback: retry without crossOrigin (loses canvas compositing but shows image)
      const img2 = new window.Image();
      img2.onload  = () => { imgCache.set(src, img2); res(img2); };
      img2.onerror = () => rej(new Error(`layer 404: ${src}`));
      img2.src = src;
    };
    img.src = src;
  });
}

function drawContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth  || cw;
  const ih = img.naturalHeight || ch;
  const s  = Math.min(cw / iw, ch / ih);
  ctx.drawImage(img, (cw - iw * s) / 2, (ch - ih * s) / 2, iw * s, ih * s);
}

async function composite(imageLink: string, numBase: number): Promise<string> {
  const shape = imageLink.includes("-")
    ? imageLink.split("-")[0].slice(-1)
    : imageLink[0] ?? "a";

  const cw  = canvasWidth();
  const ch  = Math.round(cw * (CANVAS_H_RATIO[shape] ?? 1));
  const files = buildImageLayerUrls(imageLink, numBase);
  if (!files.length) throw new Error("no layers");

  const imgs = await Promise.all(
    files.map(f => loadImage(`${CLOUDINARY_BASE}${f}`))
  );

  const canvas = document.createElement("canvas");
  canvas.width  = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, cw, ch);
  for (const img of imgs) drawContain(ctx, img, cw, ch);

  // WebP supports transparency AND is smaller than PNG (~50% less).
  // Falls back to PNG if WebP is not supported (very rare, old iOS).
  // Never use JPEG — transparent clock backgrounds become black.
  const supportsWebP = typeof document !== "undefined" &&
    document.createElement("canvas").toDataURL("image/webp").startsWith("data:image/webp");
  const mime    = supportsWebP ? "image/webp" : "image/png";
  const quality = supportsWebP ? 0.90 : undefined;

  return new Promise<string>((res, rej) =>
    canvas.toBlob(
      b => b ? res(URL.createObjectURL(b)) : rej(new Error("toBlob failed")),
      mime,
      quality,
    )
  );
}

// ─── Blob store — never revoke committed URLs ─────────────────────────────────
// We intentionally do NOT revoke URLs while they may be in the DOM.
// However, we cap the store to prevent unbounded growth on mobile.
// Cap: desktop = 80, mobile = 30 (each ~75KB JPEG → ~2.25MB total)
const store   = new Map<string, string>();
const order:    string[] = [];

function storeMax() {
  if (typeof window === "undefined") return 80;
  return window.innerWidth <= 768 ? 30 : 80;
}

function storeSet(key: string, url: string) {
  if (store.has(key)) return; // already cached — keep existing
  store.set(key, url);
  order.push(key);
  if (order.length > storeMax()) {
    const evicted = order.shift()!;
    store.delete(evicted);
    // NOTE: we do NOT revoke — the evicted URL may still be displayed somewhere.
    // The browser will free it at page unload / GC.
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export interface ClockCanvasState {
  stableSrc: string | null;
  loading:   boolean;
  error:     boolean;
  aspect:    string;
}

export function useClockCanvas(imageLink: string, numBase = 7): ClockCanvasState {
  const key   = `${imageLink}__${numBase}`;
  const shape = imageLink.includes("-")
    ? imageLink.split("-")[0].slice(-1)
    : (imageLink[0] ?? "a");
  const aspect = shape === "c" ? "16/9" : "1/1";

  const [state, setState] = useState<ClockCanvasState>(() => ({
    stableSrc: store.get(key) ?? null,
    loading:   !store.has(key) && imageLink.length >= 2,
    error:     false,
    aspect,
  }));

  const seq = useRef(0);

  useEffect(() => {
    if (!imageLink || imageLink.length < 2) {
      setState({ stableSrc: null, loading: false, error: false, aspect: "1/1" });
      return;
    }
    const sh = imageLink.includes("-")
      ? imageLink.split("-")[0].slice(-1)
      : imageLink[0] ?? "a";
    const ar = sh === "c" ? "16/9" : "1/1";

    const cached = store.get(key);
    if (cached) {
      setState({ stableSrc: cached, loading: false, error: false, aspect: ar });
      return;
    }

    const id = ++seq.current;
    setState(s => ({ ...s, loading: true, error: false, aspect: ar }));

    composite(imageLink, numBase)
      .then(url => {
        if (id !== seq.current) {
          // superseded — safe to revoke since it was never shown
          URL.revokeObjectURL(url);
          return;
        }
        storeSet(key, url);
        setState({ stableSrc: url, loading: false, error: false, aspect: ar });
      })
      .catch(() => {
        if (id !== seq.current) return;
        setState(s => ({ ...s, loading: false, error: true }));
      });
  }, [imageLink, numBase, key]);

  return state;
}
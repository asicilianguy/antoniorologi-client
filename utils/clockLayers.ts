// Exact port of server/src/utils/clockUtils.ts → buildImageLayerUrls
// Zero Express dependency — images are fetched from Cloudinary CDN directly.

export const CLOUDINARY_BASE =
  "https://res.cloudinary.com/dhd1suzc5/image/upload/v1722501018/";

/**
 * Returns the ordered list of Cloudinary filenames (without base URL)
 * to stack for the given imageLink.
 *
 * @param imageLink  e.g. "1a-abca" (not-custom) or "aabbaaababaa" (custom 12-char)
 * @param numBase    random 1-35, selects the wall/reflection variant
 * @param numberBaseMap  per-shape override map { a:N, b:N, c:N }
 */
export function buildImageLayerUrls(
  imageLink:     string,
  numBase?:      number,
  numberBaseMap?: Record<string, number>,
): string[] {
  const urls:        string[] = [];
  const isNotCustom            = imageLink.includes("-");

  const shape = isNotCustom
    ? imageLink.split("-")[0][imageLink.split("-")[0].length - 1]
    : imageLink[0] ?? "1";

  // clockSandblastingDarkerFront
  const cSDF = isNotCustom
    ? (imageLink.split("-")[1][0] === "b" || imageLink.split("-")[1][0] === "c") &&
      imageLink.split("-")[1][1] === "a"
    : (imageLink[1] === "b" || imageLink[1] === "c") && imageLink[2] === "a";

  const nb = numBase ?? (numberBaseMap ? (numberBaseMap[shape] ?? 1) : 1);

  // ── Layer 1 — base mirror ─────────────────────────────────────────────────
  urls.push(
    isNotCustom
      ? `${shape.concat(imageLink.split("-")[1][0])}_${nb}.png`
      : `${imageLink.slice(0, 2)}${imageLink.length > 1 ? `_${nb}` : ""}.png`,
  );

  // ── Layer 2 — sabbiatura (custom only) ────────────────────────────────────
  if (!isNotCustom) {
    urls.push(
      `${imageLink[0]}x${imageLink[2] ? (cSDF ? imageLink[2].concat("2") : imageLink[2]) : ""}.png`,
    );
  }

  // ── Layer 3 — indicatori ─────────────────────────────────────────────────
  if (imageLink.length > 3 || isNotCustom) {
    urls.push(
      isNotCustom
        ? `${imageLink.split("-")[0].concat("-")}x${imageLink.split("-")[1][1]}${cSDF ? "2" : ""}.png`
        : `${imageLink[0]}x${cSDF ? imageLink[2].concat("2") : imageLink[2]}${
            imageLink[0] === "a" && imageLink[7] === "b"
              ? imageLink.slice(3, 8)
              : imageLink.slice(3, 7)
          }.png`,
    );
  }

  // ── Layer 4 — barre/lancette/perimetro ───────────────────────────────────
  if (
    (imageLink[0] !== "a" && imageLink[7] === "b") ||
    (isNotCustom && (imageLink.split("-")[1]?.length ?? 0) > 2)
  ) {
    urls.push(
      isNotCustom
        ? `${shape === "c" ? shape : "x"}xxxxxxxx${imageLink.split("-")[1].slice(2, 4)}.png`
        : `${imageLink[0]}x${cSDF ? imageLink[2].concat("2") : imageLink[2]}xxx${imageLink.slice(6, 8)}.png`,
    );
  }

  // ── Layer 5 — colore lancette (custom only) ───────────────────────────────
  if (imageLink[8] !== "a" && imageLink.length >= 9 && !isNotCustom) {
    urls.push(
      `${imageLink[0]}x${cSDF ? imageLink[2].concat("2") : imageLink[2]}xxxxx${imageLink[8]}.png`,
    );
  }

  // ── Layer 6 — colore lancette (custom only) ───────────────────────────────
  if (imageLink.length >= 10 && !isNotCustom) {
    urls.push(
      imageLink[0] === "c"
        ? `cxxxxxxxx${imageLink.slice(9, 11)}.png`
        : `xxxxxxxxx${imageLink.slice(9, 11)}.png`,
    );
  }

  return urls;
}

/** Full Cloudinary URLs for all layers */
export function getClockLayerUrls(
  imageLink:     string,
  numBase?:      number,
  numberBaseMap?: Record<string, number>,
): string[] {
  return buildImageLayerUrls(imageLink, numBase, numberBaseMap).map(
    f => `${CLOUDINARY_BASE}${f}`,
  );
}

// ─── Price helpers ─────────────────────────────────────────────────────────────
export const BASE_PRICES: Record<string, number> = {
  "1a":362,"2a":347,"4c":444,"22a":362,"3a":347,"4a":320,"5a":347,"10a":382,
  "6a":550,"3b":347,"7a":550,"8a":347,"1b":347,"9a":347,"11a":825,"2b":347,
  "12a":347,"13a":550,"14a":550,"15a":347,"16a":550,"2c":550,"17a":550,
  "5b":347,"18a":550,"19a":347,"20a":382,"21a":347,"23a":550,"4b":320,
  "5c":347,"24a":550,"25a":347,"1c":550,"26a":382,"27a":347,"28a":382,
  "3c":347,"29a":347,"1d":550,"1e":550,"30a":347,"31a":347,"32a":347,
  "33a":382,"34a":347,"35a":347,"36a":382,"37a":347,"38a":347,"39a":347,
  "40a":382,"41a":382,"42a":347,"43a":382,"6c":550,"7c":550,"6b":382,
};

const NOT_CUSTOM_OPTS_INC: [string, Record<string,number>][] = [
  ["colorClock",    { a:0, b:0.20, c:0.20, d:0.32 }],
  ["sandblasting",  { a:0, b:0.08, c:0.08 }],
  ["clockHands",    { a:0, b:0,    c:0,    d:0.12, e:0.12 }],
  ["colorHands",    { a:0, b:0,    c:0 }],
  ["size",          { a:0, b:0.28, c:0.60 }],
];

export function getPriceFromImageLink(imageLink: string): number {
  if (!imageLink || !imageLink.includes("-")) return 0;
  const [clockId, opts] = imageLink.split("-");
  const base = BASE_PRICES[clockId] ?? 0;
  if (!opts) return base;
  let price = base;
  NOT_CUSTOM_OPTS_INC.forEach(([, map], i) => {
    const char = opts[i] ?? "a";
    const inc  = map[char] ?? 0;
    if (inc) price += Math.round(base * inc);
  });
  return price;
}

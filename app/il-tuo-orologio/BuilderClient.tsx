"use client";
import { useState, useMemo, useCallback } from "react";
import ClockCanvas from "../../components/ClockCanvas";

const CDN = "https://res.cloudinary.com/dhd1suzc5/image/upload/v1722501018/";

// ─── Phases: exact port of legacy sliderCustomClockOptions + phaseLabel ──────
const PHASES: {
  key:   string;
  label: string;
  opts:  { value: string; label: string; inc?: number; notShape?: string }[];
}[] = [
  { key:"shape",              label:"Forma",
    opts:[{value:"a",label:"Circolare"},{value:"b",label:"Quadrato"},{value:"c",label:"Rettangolo",inc:0.28}] },
  { key:"colorClock",         label:"Sfumatura Specchio",
    opts:[{value:"a",label:"Nessuna"},{value:"b",label:"Fumè",inc:0.20},{value:"c",label:"Bronzo",inc:0.20},{value:"d",label:"Invecchiato",inc:0.32}] },
  { key:"clockSandblasting",  label:"Sabbiatura Orologio",
    opts:[{value:"a",label:"Davanti"},{value:"b",label:"Dietro"},{value:"c",label:"Dietro - Nero",inc:0.08}] },
  { key:"indicators",         label:"Indicatori",
    opts:[{value:"a",label:"Numeri Romani"},{value:"b",label:"Numeri Arabi"}] },
  { key:"font",               label:"Font",
    opts:[{value:"a",label:"Century"},{value:"b",label:"Balinest"},{value:"c",label:"Glow Roses"},{value:"d",label:"Kilsonburg"},{value:"e",label:"Park Lane"},{value:"f",label:"Riesling"},{value:"g",label:"Smart Frocks"},{value:"h",label:"The Saroja"}] },
  { key:"indicatorsLayout",   label:"Disposizione Indicatori",
    opts:[{value:"a",label:"Dritti"},{value:"b",label:"Seguendo la forma"}] },
  { key:"indicatorsSize",     label:"Dimensione Indicatori",
    opts:[{value:"a",label:"Piccolo"},{value:"b",label:"Medio"},{value:"c",label:"Grande"}] },
  { key:"clockBars",          label:"Asticelle Indicatori",
    opts:[{value:"a",label:"No"},{value:"b",label:"Sì"}] },
  { key:"permiterSandblasting",label:"Contorno",
    opts:[{value:"a",label:"Nessuno"},{value:"b",label:"Esterno",inc:0.08},{value:"c",label:"Interno",inc:0.08},{value:"d",label:"Entrambi",inc:0.12}] },
  { key:"clockHands",         label:"Lancette",
    opts:[{value:"a",label:"Tipo 1"},{value:"b",label:"Tipo 2"},{value:"c",label:"Tipo 3"},{value:"d",label:"Tipo 4",inc:0.12},{value:"e",label:"Tipo 5",inc:0.12}] },
  { key:"colorClockHands",    label:"Colore Lancette",
    opts:[{value:"a",label:"Nero"},{value:"b",label:"Cromo"},{value:"c",label:"Oro"}] },
  { key:"size",               label:"Dimensione Specchio",
    opts:[{value:"a",label:"50cm"},{value:"b",label:"80cm",inc:0.28},{value:"c",label:"100cm",inc:0.60,notShape:"c"}] },
];

const KEYS       = PHASES.map(p => p.key);
const BASE_PRICE = 300;


type ClockState = Record<string, string>;

/**
 * Exact port of legacy retrieveYourClockRandom + size.
 * Returns a fully-populated ClockState.
 */
function randomClock(): ClockState {
  const r = (n: number) => String.fromCharCode(97 + Math.floor(Math.random() * n));

  // shape — a/b/c
  let shape: string;
  let colorClock: string;
  // Legacy rule: avoid shape=a + colorClock=b combination
  do {
    shape      = r(3);
    colorClock = r(4);
  } while (shape === "a" && colorClock === "b");

  const sandblasting   = r(3);
  const indicators     = r(2);
  const font           = r(8);
  const layout         = r(2);
  const indSize        = r(3);
  const bars           = r(2);
  const perim          = r(4);
  const hands          = r(5);
  const colorHands     = r(3);
  // size: if rettangolo (c), no 100cm (c)
  const size           = shape === "c" ? r(2) : r(3);

  return {
    shape, colorClock, clockSandblasting: sandblasting, indicators, font,
    indicatorsLayout: layout, indicatorsSize: indSize, clockBars: bars,
    permiterSandblasting: perim, clockHands: hands, colorClockHands: colorHands, size,
  };
}

function buildImageLink(c: ClockState): string {
  return KEYS.map(k => c[k] || "").join("");
}

function isPhaseUnlocked(c: ClockState, key: string): boolean {
  const idx = KEYS.indexOf(key);
  return KEYS.slice(0, idx).every(k => !!c[k]);
}

function calcPrice(c: ClockState): number {
  const INC: number[][] = [
    [0,0.28,0],[0,0.20,0.20,0.32],[0,0,0.08],[0,0],[0,0,0,0,0,0,0,0],
    [0,0],[0,0,0],[0,0],[0,0.08,0.08,0.12],[0,0,0,0.12,0.12],[0,0,0],[0,0.28,0.60],
  ];
  const V = ["a","b","c","d","e","f","g","h"];
  let p   = BASE_PRICE;
  KEYS.forEach((k, i) => {
    const inc = INC[i]?.[V.indexOf(c[k] ?? "a")] ?? 0;
    if (inc) p += Math.round(BASE_PRICE * inc);
  });
  return p;
}

/** Thumbnail URL for option — legacy suffixImageUrl logic */
function thumbUrl(phaseIdx: number, optValue: string, clockState: ClockState): string {
  const n = phaseIdx + 1;
  if (n === 3 && optValue === "a" && (clockState.colorClock === "b" || clockState.colorClock === "c"))
    return `${CDN}${n}c_a2.png`;
  if (n === 12) return `${CDN}${n}c_${clockState.shape || "a"}.png`;
  return `${CDN}${n}c_${optValue}.png`;
}

export default function BuilderClient() {
  // ── Stable random seed — populated only on client to avoid hydration mismatch
  // Safe: this component is only rendered client-side (dynamic { ssr: false })
  const [numBase, setNumBase] = useState(() => Math.floor(Math.random() * 35) + 1);
  const [clock,  setClock]   = useState<ClockState>(() => randomClock());
  const [phase,  setPhase]   = useState(0);
  const [zoomed, setZoomed]  = useState(false);

  const imageLink  = useMemo(() => buildImageLink(clock), [clock]);
  const isComplete = useMemo(() => PHASES.every(p => !!clock[p.key]), [clock]);
  const price      = useMemo(() => calcPrice(clock), [clock]);
  const progress   = useMemo(() =>
    Math.round(KEYS.filter(k => !!clock[k]).length / KEYS.length * 100), [clock]);

  const select = useCallback((key: string, value: string) => {
    const idx = KEYS.indexOf(key);
    if (!isPhaseUnlocked(clock, key)) return;
    setClock(prev => {
      const next = { ...prev, [key]: value };
      if (key === "shape" && value === "c" && next.size === "c") next.size = "a";
      return next;
    });
    if (idx < PHASES.length - 1)
      setTimeout(() => setPhase(Math.min(idx + 1, PHASES.length - 1)), 280);
  }, [clock]);

  const cur    = PHASES[phase];
  const waMsg  = encodeURIComponent(
    `Ciao, vorrei un orologio personalizzato:\nConfigurazione: ${imageLink}\nPrezzo stimato: ${price}€`
  );

  return (
    <div className="page custom-root">

      {/* ── LEFT preview ─────────────────────────────────────────────────── */}
      <aside className="custom-preview">
        <div className="custom-progress">
          <div className="custom-progress__bar" style={{ width:`${progress}%` }} />
        </div>

        {/* Clock preview — bg matches the dark panel so shimmer is invisible */}
        <div className="custom-preview__clock"
          style={{ cursor: imageLink.length >= 2 ? "zoom-in" : "default" }}
          onClick={() => imageLink.length >= 2 && setZoomed(true)}>
          <ClockCanvas
            imageLink={imageLink}
            numBase={numBase}
           
            style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.55))" }}
          />
        </div>

        <div className="custom-preview__info">
          <div className="custom-preview__step">
            Fase <strong>{phase+1}</strong> di {PHASES.length} &mdash; {cur.label}
          </div>
          {isComplete && <div className="custom-preview__price">{price} €</div>}
        </div>

        {isComplete && (
          <a href={`https://wa.me/390922437493?text=${waMsg}`}
             target="_blank" rel="noopener noreferrer"
             className="btn btn-dark custom-preview__cta">
            Richiedi su WhatsApp
          </a>
        )}

        <button className="custom-preview__reroll"
          onClick={() => { setNumBase(Math.floor(Math.random() * 35) + 1); setClock(randomClock()); setPhase(0); }}
          title="Genera un orologio casuale">
          ↻ Nuovo casuale
        </button>
      </aside>

      {/* ── RIGHT configurator ───────────────────────────────────────────── */}
      <main className="custom-config">
        <div className="custom-nav">
          {PHASES.map((p, i) => (
            <button key={p.key}
              className={`custom-nav__dot ${i===phase?"active":""} ${clock[p.key]?"done":""}`}
              onClick={() => setPhase(i)}
              title={`${i+1}: ${p.label}`}
            />
          ))}
        </div>

        <div className="custom-config__inner">
          <div className="custom-config__label">{cur.label}</div>

          <div className="opts-grid">
            {cur.opts.map(opt => {
              if (cur.key === "size" && opt.notShape === clock.shape) return null;
              const isSelected = clock[cur.key] === opt.value;
              const locked     = !isPhaseUnlocked(clock, cur.key);
              const thumb      = thumbUrl(phase, opt.value, clock);
              return (
                <button key={opt.value}
                  className={`opt-card ${isSelected?"active":""} ${locked?"locked":""}`}
                  onClick={() => select(cur.key, opt.value)}
                  disabled={locked}>
                  {/* Thumbnail: object-fit contain so the clock shape is fully visible */}
                  <div className="opt-card__thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb} alt={opt.label} loading="lazy" decoding="async"
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <span className="opt-card__label">{opt.label}</span>
                  {opt.inc && <span className="opt-card__extra">+{Math.round(opt.inc*100)}%</span>}
                </button>
              );
            })}
          </div>

          <div className="custom-arrows">
            <button className="custom-arrow" disabled={phase===0}
              onClick={() => setPhase(p => p-1)}>← Precedente</button>
            <span className="custom-arrow-counter">{phase+1}/{PHASES.length}</span>
            <button className="custom-arrow"
              disabled={phase===PHASES.length-1 || !clock[cur.key]}
              onClick={() => setPhase(p => p+1)}>Successivo →</button>
          </div>
        </div>
      </main>

      {/* ── Zoom overlay ─────────────────────────────────────────────────── */}
      {zoomed && imageLink.length >= 2 && (
        <div className="zoom-overlay" onClick={() => setZoomed(false)}>
          <div className="zoom-clock" onClick={e => e.stopPropagation()}>
            <ClockCanvas imageLink={imageLink} numBase={numBase} />
          </div>
          <button className="zoom-close" onClick={() => setZoomed(false)}>✕</button>
        </div>
      )}

      <style suppressHydrationWarning>{`
        .custom-root { display:grid; grid-template-columns:460px 1fr; min-height:calc(100dvh - var(--nav-h)); }

        /* Preview panel */
        .custom-preview { background:var(--ink); display:flex; flex-direction:column; align-items:center; padding:2.5rem 2rem 1.5rem; gap:1.25rem; position:sticky; top:var(--nav-h); height:calc(100dvh - var(--nav-h)); overflow:hidden; }
        .custom-progress { width:100%; height:2px; background:rgba(255,255,255,.1); border-radius:1px; flex-shrink:0; }
        .custom-progress__bar { height:100%; background:var(--gold); border-radius:1px; transition:width .4s ease; }

        /* Clock area: fixed square container, clock is object-fit:contain inside */
        .custom-preview__clock {
          flex:1;
          width:100%;
          min-height:0;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .custom-preview__info { text-align:center; color:rgba(255,255,255,.6); font-size:.82rem; flex-shrink:0; }
        .custom-preview__step strong { color:white; }
        .custom-preview__price { font-family:var(--font-serif); font-size:1.75rem; color:var(--gold); margin-top:.4rem; }
        .custom-preview__cta { width:100%; justify-content:center; flex-shrink:0; }
        .custom-preview__reroll { background:none; border:1px solid rgba(255,255,255,.15); color:rgba(255,255,255,.45); font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; padding:.4rem 1rem; cursor:pointer; transition:all .2s; flex-shrink:0; }
        .custom-preview__reroll:hover { border-color:rgba(255,255,255,.4); color:rgba(255,255,255,.75); }

        /* Configurator panel */
        .custom-config { display:flex; flex-direction:column; padding:2.5rem; gap:1.5rem; overflow-y:auto; }
        .custom-nav { display:flex; gap:.4rem; flex-wrap:wrap; }
        .custom-nav__dot { width:26px; height:26px; border-radius:50%; border:1.5px solid var(--cream-dark); background:white; cursor:pointer; transition:all .2s; }
        .custom-nav__dot.done   { background:rgba(110,100,89,.15); border-color:var(--brown); }
        .custom-nav__dot.active { background:var(--brown); border-color:var(--brown); box-shadow:0 0 0 3px rgba(110,100,89,.2); }
        .custom-config__inner { display:flex; flex-direction:column; gap:1.75rem; }
        .custom-config__label { font-family:var(--font-serif); font-size:1.6rem; font-weight:300; line-height:1.1; }

        /* Options grid */
        .opts-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(96px,1fr)); gap:.75rem; }
        .opt-card { display:flex; flex-direction:column; align-items:center; gap:.4rem; border:1.5px solid var(--cream-dark); background:white; padding:.5rem .5rem .6rem; cursor:pointer; transition:border-color .15s, background .15s; text-align:center; }
        .opt-card:hover:not(.locked)  { border-color:var(--brown); }
        .opt-card.active { border-color:var(--brown); background:var(--brown); color:white; }
        .opt-card.locked { opacity:.35; cursor:not-allowed; }

        /* Thumbnail: fixed height, object-fit CONTAIN so shape is always fully visible */
        .opt-card__thumb {
          width:100%;
          height:80px;
          background: var(--cream);
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
          padding:6px;
          box-sizing:border-box;
        }
        .opt-card.active .opt-card__thumb { background:rgba(255,255,255,.12); }
        .opt-card__thumb img {
          width:100%;
          height:100%;
          object-fit: contain;   /* ← CONTAIN so shape is not cropped */
          display:block;
        }

        .opt-card__label { font-size:.72rem; letter-spacing:.03em; line-height:1.2; }
        .opt-card__extra { font-size:.62rem; opacity:.6; }

        /* Navigation */
        .custom-arrows { display:flex; align-items:center; gap:1rem; margin-top:.5rem; }
        .custom-arrow { font-size:.75rem; letter-spacing:.08em; color:var(--muted); background:none; border:none; cursor:pointer; padding:.5rem 0; transition:color .2s; }
        .custom-arrow:hover:not(:disabled) { color:var(--ink); }
        .custom-arrow:disabled { opacity:.3; cursor:default; }
        .custom-arrow-counter { font-size:.78rem; color:var(--brown-light); }

        /* Zoom overlay */
        .zoom-overlay { position:fixed; inset:0; background:rgba(0,0,0,.9); z-index:200; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(10px); }
        .zoom-clock { width:min(600px,85vw); }
        .zoom-close { position:absolute; top:2rem; right:2rem; background:none; border:none; color:rgba(255,255,255,.7); font-size:1.5rem; cursor:pointer; transition:color .2s; }
        .zoom-close:hover { color:white; }

        @media (max-width:900px) {
          .custom-root { grid-template-columns:1fr; }
          .custom-preview { position:static; height:auto; min-height:50dvh; }
          .custom-preview__clock { height:40dvh; flex:none; }
          .custom-config { padding:1.5rem; }
          .opts-grid { grid-template-columns:repeat(auto-fill,minmax(80px,1fr)); gap:.5rem; }
          .opt-card__thumb { height:64px; padding:4px; }
        }
      `}</style>
    </div>
  );
}

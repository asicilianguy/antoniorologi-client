"use client";
import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  CATALOG_IDS, CLOCK_INFO, BASE_PRICES, calcNotCustomPrice,
  NC_COLOR_OPTIONS, NC_SANDBLASTING_OPTIONS, NC_HANDS_OPTIONS,
  NC_COLOR_HANDS_OPTIONS, NC_SIZE_OPTIONS,
} from "../../utils/data";

const ClockCanvas = dynamic(() => import("../../components/ClockCanvas"), { ssr: false });

const CDN = "https://res.cloudinary.com/dhd1suzc5/image/upload/v1722501018/";
const NB  = 7;

// NC thumbnails — legacy imageSliderNotCustomOptions numbering:
//   1nc_ = colorClock (a,b,c,d)
//   2nc_ = sandblasting (a, a2-darker when color b/c, b, c)
//   3nc_ = clockHands (a,b,c,d,e)
//   4nc_ = colorClockHands (a,b,c)
//   5nc_ = size — uses current SHAPE letter (legacy: suffixImageUrl = shapeClock)
function ncThumb(phaseKey: string, value: string, clockShape: string, colorClock: string): string {
  if (phaseKey === "sand" && value === "a" && (colorClock === "b" || colorClock === "c"))
    return `${CDN}2nc_a2.png`;
  if (phaseKey === "size") return `${CDN}5nc_${clockShape}.png`;
  const N: Record<string,number> = { color:1, sand:2, hands:3, chands:4 };
  return `${CDN}${N[phaseKey]}nc_${value}.png`;
}

const SHAPE_FILTER = [
  {value:"all",label:"Tutti"},{value:"a",label:"Circolari"},
  {value:"b",label:"Quadrati"},{value:"c",label:"Rettangolari"},
];

const NC_PHASES = [
  {key:"color",  label:"Sfumatura Specchio",  opts:NC_COLOR_OPTIONS       },
  {key:"sand",   label:"Sabbiatura Orologio", opts:NC_SANDBLASTING_OPTIONS},
  {key:"hands",  label:"Lancette",            opts:NC_HANDS_OPTIONS       },
  {key:"chands", label:"Colore Lancette",     opts:NC_COLOR_HANDS_OPTIONS },
  {key:"size",   label:"Dimensione Specchio", opts:NC_SIZE_OPTIONS        },
];

type NCOpts = {color:string;sand:string;hands:string;chands:string;size:string};
const DEFAULT_NC: NCOpts = {color:"a",sand:"a",hands:"a",chands:"a",size:"a"};

function buildImageLink(id:string, o:NCOpts) {
  return `${id}-${o.color}${o.sand}${o.hands}${o.chands}`;
}

export default function CatalogClient() {
  const [shapeFilter, setShapeFilter] = useState("all");
  const [selectedId,  setSelectedId]  = useState<string|null>(null);
  const [opts,        setOpts]        = useState<NCOpts>(DEFAULT_NC);

  const filtered = useMemo(() =>
    CATALOG_IDS.filter(id => shapeFilter === "all" || id.slice(-1) === shapeFilter),
  [shapeFilter]);

  const selectClock = useCallback((id: string) => {
    setSelectedId(prev => { if (prev === id) return null; setOpts(DEFAULT_NC); return id; });
  }, []);

  const closeDrawer = useCallback(() => setSelectedId(null), []);
  const setOpt = useCallback((key: keyof NCOpts, value: string) => {
    setOpts(prev => ({...prev, [key]: value}));
  }, []);

  const info      = selectedId ? CLOCK_INFO[selectedId]   : null;
  const imageLink = selectedId ? buildImageLink(selectedId, opts) : "";
  const price     = selectedId ? calcNotCustomPrice(selectedId, `${opts.color}${opts.sand}${opts.hands}${opts.chands}${opts.size}`) : 0;
  const shapeId   = selectedId?.slice(-1) ?? "a";
  const waMsg     = selectedId ? encodeURIComponent(
    `Ciao, sono interessato all'orologio ${info?.title ?? selectedId}.\nConfigurazione: ${imageLink}-${opts.size}\nPrezzo: ${price}€`
  ) : "";

  return (
    <>
      <div className="page catalog-page">
        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="catalog-header">
          <div className="section-label">Collezione</div>
          <h1 className="section-title">I nostri orologi</h1>
          <p className="catalog-header__sub">
            Ogni orologio è personalizzabile in sfumatura, sabbiatura, lancette e dimensione.
          </p>
          <div className="filter-row">
            {SHAPE_FILTER.map(f => (
              <button key={f.value}
                className={`filter-btn ${shapeFilter===f.value?"active":""}`}
                onClick={() => setShapeFilter(f.value)}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────────────── */}
        <div className={`catalog-grid ${selectedId?"drawer-open":""}`}>
          {filtered.map(id => {
            const inf    = CLOCK_INFO[id];
            const active = selectedId === id;
            const link   = active ? imageLink : `${id}-aaaa`;
            return (
              <article key={id}
                className={`clock-card ${active?"active":""}`}
                onClick={() => selectClock(id)}>
                <div className="clock-card__img">
                  <ClockCanvas imageLink={link} numBase={NB} />
                </div>
                <div className="clock-card__body">
                  <div className="clock-card__name">{inf?.title ?? id.toUpperCase()}</div>
                  <div className="clock-card__price">da {BASE_PRICES[id] ?? 0} €</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── Drawer — position:fixed, viewport-anchored, scroll-independent ── */}
      <div className={`drawer ${selectedId?"open":""}`}>
        {selectedId && <div className="drawer__backdrop" onClick={closeDrawer} />}
        <div className="drawer__panel">
          <button className="drawer__close" onClick={closeDrawer}>✕</button>

          {selectedId && (
            <>
              {/* Preview */}
              <div className="drawer__preview">
                <ClockCanvas imageLink={imageLink} numBase={NB} />
              </div>

              {/* Info */}
              <div className="drawer__info">
                <div className="drawer__title">{info?.title ?? selectedId.toUpperCase()}</div>
                {info?.description && <p className="drawer__desc">{info.description}</p>}
              </div>

              {/* Options */}
              <div className="drawer__config">
                {NC_PHASES.map(phase => {
                  const options = phase.key === "size" && shapeId === "c"
                    ? phase.opts.filter(o => o.value !== "c")
                    : phase.opts;
                  return (
                    <div key={phase.key} className="nc-phase">
                      <div className="nc-phase__label">{phase.label}</div>
                      <div className="nc-phase__opts">
                        {options.map(opt => (
                          <button key={opt.value}
                            className={`nc-opt ${opts[phase.key as keyof NCOpts]===opt.value?"active":""}`}
                            onClick={() => setOpt(phase.key as keyof NCOpts, opt.value)}>
                            <div className="nc-opt__thumb">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={ncThumb(phase.key, opt.value, shapeId, opts.color)} alt={opt.label}
                                loading="lazy" decoding="async"
                                onError={e=>{(e.target as HTMLImageElement).style.opacity="0";}} />
                            </div>
                            <span>{opt.label}</span>
                            {(opt as any).inc ? <span className="nc-opt__inc">+{Math.round((opt as any).inc*100)}%</span> : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer sticky */}
              <div className="drawer__footer">
                <div className="drawer__price-row">
                  <span className="drawer__price-label">Prezzo configurato</span>
                  <span className="drawer__price">{price} €</span>
                </div>
                <a href={`https://wa.me/390922437493?text=${waMsg}`}
                   target="_blank" rel="noopener noreferrer"
                   className="btn btn-dark drawer__cta">
                  Richiedi su WhatsApp
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <style suppressHydrationWarning>{`
        /* Page */
        .catalog-page { max-width:1400px; margin:0 auto; padding-bottom:5rem; }
        .catalog-header { padding:3rem 2.5rem 2rem; max-width:700px; }
        .catalog-header__sub { font-size:.92rem; color:var(--muted); margin-top:.6rem; line-height:1.6; }
        .filter-row  { display:flex; gap:.5rem; flex-wrap:wrap; margin-top:1.5rem; }
        .filter-btn  { font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; padding:.45rem 1rem; border:1px solid var(--cream-dark); background:white; color:var(--muted); cursor:pointer; transition:all .2s; }
        .filter-btn:hover  { border-color:var(--brown); color:var(--ink); }
        .filter-btn.active { border-color:var(--brown); background:var(--brown); color:white; }

        /* Grid */
        .catalog-grid {
          display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
          gap:1.5rem; padding:0 2.5rem;
          transition: padding-right .35s cubic-bezier(.4,0,.2,1);
        }
        .catalog-grid.drawer-open { padding-right:calc(420px + 2.5rem); }

        .clock-card { background:white; cursor:pointer; transition:transform .2s, box-shadow .2s; outline:2px solid transparent; display:flex; flex-direction:column; }
        .clock-card:hover  { transform:translateY(-3px); box-shadow:var(--shadow); }
        .clock-card.active { outline:2px solid var(--brown); }
        .clock-card__img   { background:var(--cream-dark); padding:1.75rem; aspect-ratio:1; display:flex; align-items:center; justify-content:center; }
        .clock-card__body  { padding:.85rem 1rem; display:flex; justify-content:space-between; align-items:baseline; border-top:1px solid var(--cream-dark); }
        .clock-card__name  { font-family:var(--font-serif); font-size:.95rem; }
        .clock-card__price { font-size:.75rem; color:var(--muted); }

        /* ── Drawer — FIXED to viewport, no relation to page scroll ── */
        .drawer__backdrop {
          position:fixed; inset:0; z-index:49;
          background:rgba(26,22,18,.3); backdrop-filter:blur(2px);
          animation:bd-in .25s ease;
        }
        @keyframes bd-in { from{opacity:0} to{opacity:1} }

        .drawer__panel {
          position:fixed; top:var(--nav-h); right:0; bottom:0;
          width:420px; z-index:50;
          background:white;
          display:flex; flex-direction:column;
          overflow-y:auto; overscroll-behavior:contain;
          transform:translateX(100%);
          transition:transform .35s cubic-bezier(.4,0,.2,1);
          box-shadow:-8px 0 40px rgba(0,0,0,.12);
        }
        .drawer.open .drawer__panel { transform:translateX(0); }

        .drawer__close {
          position:sticky; top:0; align-self:flex-end;
          margin:.75rem .75rem 0 0; z-index:1;
          background:none; border:none; font-size:1.1rem;
          color:var(--muted); cursor:pointer; transition:color .2s; flex-shrink:0;
        }
        .drawer__close:hover { color:var(--ink); }

        .drawer__preview { background:var(--cream-dark); padding:2rem; flex-shrink:0; margin:0 1.5rem; }
        .drawer__info    { padding:1.25rem 1.5rem .75rem; flex-shrink:0; border-bottom:1px solid var(--cream-dark); }
        .drawer__title   { font-family:var(--font-serif); font-size:1.35rem; font-weight:300; margin-bottom:.35rem; }
        .drawer__desc    {
          font-size:.78rem; color:var(--muted); line-height:1.65;
          display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden;
        }

        .drawer__config { padding:1rem 1.5rem; display:flex; flex-direction:column; gap:1rem; flex:1; }
        .nc-phase__label { font-size:.65rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:.4rem; }
        .nc-phase__opts  { display:flex; flex-wrap:wrap; gap:.4rem; }
        .nc-opt {
          display:flex; flex-direction:column; align-items:center; gap:.35rem;
          border:1.5px solid var(--cream-dark); background:white;
          padding:.5rem .4rem .55rem; cursor:pointer; transition:all .15s;
          min-width:62px; text-align:center; font-size:.68rem; color:var(--ink);
          letter-spacing:.01em;
        }
        .nc-opt:hover   { border-color:var(--brown); }
        .nc-opt.active  { border-color:var(--brown); background:var(--brown); color:white; }
        .nc-opt__thumb  {
          width:52px; height:52px;
          background:var(--cream-dark); overflow:hidden;
          display:flex; align-items:center; justify-content:center;
        }
        .nc-opt.active .nc-opt__thumb { background:rgba(255,255,255,.15); }
        .nc-opt__thumb img { width:100%; height:100%; object-fit:contain; display:block; }
        /* Percentage badge — clearly visible */
        .nc-opt__inc {
          font-size:.62rem; font-weight:600;
          color:var(--brown-light);
          background:rgba(110,100,89,.1);
          padding:.1rem .35rem; border-radius:8px;
          letter-spacing:.02em;
        }
        .nc-opt.active .nc-opt__inc {
          color:rgba(255,255,255,.9);
          background:rgba(255,255,255,.2);
        }

        .drawer__footer {
          padding:1rem 1.5rem 1.5rem; border-top:1px solid var(--cream-dark);
          flex-shrink:0; background:white; position:sticky; bottom:0;
        }
        .drawer__price-row  { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:.85rem; }
        .drawer__price-label{ font-size:.68rem; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); }
        .drawer__price      { font-family:var(--font-serif); font-size:1.5rem; }
        .drawer__cta        { width:100%; justify-content:center; }

        @media (max-width:1100px) {
          .catalog-grid.drawer-open { padding-right:2.5rem; }
          /* Panel still starts below the navbar on tablet */
          .drawer__panel { top: var(--nav-h); }
        }
        @media (max-width:600px) {
          .catalog-header { padding:2rem 1.25rem 1.5rem; }
          .catalog-grid { padding:0 1.25rem; grid-template-columns:1fr 1fr; gap:1rem; }
          .drawer__panel { width:100%; max-width:100%; top:var(--nav-h); }
        }
      `}</style>
    </>
  );
}
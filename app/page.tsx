import Link from "next/link";
import dynamic from "next/dynamic";
import { CLOCK_INFO, BASE_PRICES } from "../utils/data";

const ClockCanvas = dynamic(() => import("../components/ClockCanvas"), { ssr: false });

// ─── Hero carousel — 6 images from arrayImageHomeCarousel (legacy)
// Pure CSS crossfade — zero JS, zero library, mobile safe
// Full list was: [3,7,12,18,22,27,31,35,39,44,48,51,54,57,41]
// We pick 6 visually diverse ones
const HERO_IMGS = [3, 12, 22, 35, 48, 41];
const CDN = "https://res.cloudinary.com/dhd1suzc5/image/upload/";
const HERO_CDN = "https://res.cloudinary.com/dhd1suzc5/image/upload/v1732113290/";

// Featured clocks — legacy: imageLinksToFind = ["16a-", "3c-", "4b-", "1e-"]
const FEATURED = [
  { id:"16a", suffix:"acbc", nb:7  },
  { id:"3c",  suffix:"ccdc", nb:14 },
  { id:"4b",  suffix:"aaaa", nb:21 },
  { id:"1e",  suffix:"cadb", nb:28 },
];

const STATS = [
  { n:"43+",    label:"Modelli" },
  { n:"1000+",  label:"Clienti soddisfatti" },
  { n:"100%",   label:"Made in Sicily" },
  { n:"∞",      label:"Combinazioni custom" },
];

export default function HomePage() {
  return (
    <div className="page home">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        {/* CSS crossfade carousel — no JS, no library */}
        <div className="hero__bg">
          {HERO_IMGS.map((n, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={n}
              src={`${HERO_CDN}home_${n}.png`}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="hero__bg-img"
              style={{ animationDelay: `${i * 6}s` }}
            />
          ))}
          <div className="hero__overlay" style={{zIndex: 7}} />
        </div>

        <div className="hero__content">
          <div className="hero__label">Artigianato Siciliano</div>
          <h1 className="hero__title">
            Ogni secondo conta<br />
            <em>Ogni dettaglio pure</em>
          </h1>
          <p className="hero__sub">
            Orologi da parete in specchio, realizzati a mano in Sicilia.<br />
            Pezzi unici, personalizzabili in ogni dettaglio.
          </p>
          <div className="hero__actions">
            <Link href="/i-nostri-orologi" className="btn-hero-primary">
              Scopri la collezione
            </Link>
            <Link href="/il-tuo-orologio" className="btn-hero-ghost">
              Crea il tuo
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>Scorri</span>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="stats">
        {STATS.map(s => (
          <div key={s.label} className="stats__item">
            <div className="stats__n">{s.n}</div>
            <div className="stats__label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── SECTION 1: il dettaglio ─────────────────────────────────────────── */}
      <section className="pres pres--right">
        <div className="pres__photo"
          style={{ backgroundImage:`url('${CDN}v1733858906/sezione__first.jpg')` }} />
        <div className="pres__text">
          <div className="pres__label">Il dettaglio che fa la differenza</div>
          <h2 className="pres__title">
            Trasforma la tua casa<br />in uno spazio unico
          </h2>
          <p>
            Le pareti di casa non dovrebbero mai essere anonime: meritano un dettaglio
            che parli di te e del tuo stile, capace di trasformare ogni ambiente in
            uno spazio accogliente e unico.
          </p>
          <p>
            Non solo strumenti funzionali, ma elementi di design che ampliano la
            percezione dello spazio, catturano la luce e diventano il cuore della
            stanza, senza essere invadenti.
          </p>
          <Link href="/i-nostri-orologi" className="pres__cta">
            Scopri la collezione →
          </Link>
        </div>
      </section>

      {/* ── FEATURED CLOCKS ─────────────────────────────────────────────────── */}
      <section className="featured">
        <div className="featured__header">
          <div className="featured__label">La collezione</div>
          <h2 className="featured__title">I nostri orologi</h2>
          <p className="featured__sub">
            Scopri la nostra selezione unica di orologi da parete in specchio,
            dove ogni riflessione è un'opera d'arte.
          </p>
        </div>

        <div className="featured__grid">
          {FEATURED.map(({ id, suffix, nb }) => {
            const imageLink = `${id}-${suffix}`;
            const info = CLOCK_INFO[id];
            const price = BASE_PRICES[id] ?? 0;
            return (
              <Link key={id} href="/i-nostri-orologi" className="feat-card">
                <div className="feat-card__img">
                  <ClockCanvas imageLink={imageLink} numBase={nb} />
                </div>
                <div className="feat-card__body">
                  <div className="feat-card__name">{info?.title ?? id}</div>
                  <div className="feat-card__desc">{info?.description?.slice(0,80)}…</div>
                  <div className="feat-card__price">da {price} €</div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="featured__more">
          <Link href="/i-nostri-orologi" className="btn-outline-dark">
            Vedi tutti i 43 modelli
          </Link>
        </div>
      </section>

      {/* ── SECTION 2: collezione ─────────────────────────────────────────────── */}
      <section className="pres pres--left">
        <div className="pres__photo"
          style={{ backgroundImage:`url('${CDN}v1733858906/sezione__second.jpg')` }} />
        <div className="pres__text">
          <div className="pres__label">Una collezione esclusiva</div>
          <h2 className="pres__title">
            Unica,<br />come te
          </h2>
          <p>
            La nostra collezione nasce da un'idea originale, unendo linee eleganti
            e materiali raffinati per creare pezzi che non solo si integrano nel
            tuo ambiente, ma lo trasformano.
          </p>
          <p>
            Ogni dettaglio è personalizzabile, dalle sfumature dello specchio
            ai colori delle lancette, fino alle dimensioni e alla sabbiatura.
          </p>
          <Link href="/i-nostri-orologi" className="pres__cta">
            Esplora la collezione →
          </Link>
        </div>
      </section>

      {/* ── VIDEO SECTION ──────────────────────────────────────────────────────── */}
      <section className="video-section">
        <div className="video-section__inner">
          <div className="video-section__text">
            <div className="video-section__label">La nostra missione</div>
            <h2 className="video-section__title">
              Passione artigianale<br />in ogni dettaglio
            </h2>
            <p>
              Scopri cosa si nasconde dietro ogni orologio Antonio Orologi.
              Passione, cura, minuziosità e dedizione artigianale — ogni
              dettaglio racconta la nostra storia.
            </p>
            <p>
              Un viaggio attraverso la nostra arte di creare orologi a specchio
              che uniscono eleganza italiana e precisione artigianale.
            </p>
          </div>
          <div className="video-section__video">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              controls
              autoPlay
              muted
              playsInline
              loop
              poster="https://res.cloudinary.com/dhd1suzc5/video/upload/v1763632774/videobello.jpg"
            >
              <source
                src="https://res.cloudinary.com/dhd1suzc5/video/upload/v1763632774/videobello.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* ── CUSTOM CTA ────────────────────────────────────────────────────────── */}
      <section className="custom-band">
        <div className="custom-band__photo"
          style={{ backgroundImage:`url('${CDN}v1733858906/sezione__third.jpg')` }} />
        <div className="custom-band__overlay" />
        <div className="custom-band__content">
          <div className="custom-band__label">Personalizzazione totale</div>
          <h2 className="custom-band__title">
            Progetta il tuo<br />orologio unico
          </h2>
          <p>
            Migliaia di combinazioni possibili. Scegli forma, colore, sabbiatura,
            lancette e dimensione — ogni orologio è un pezzo unico creato
            esattamente come lo immagini.
          </p>
          <Link href="/il-tuo-orologio" className="btn-hero-primary">
            Inizia a personalizzare
          </Link>
        </div>
      </section>

      {/* ── SECTION 3: business ───────────────────────────────────────────────── */}
      <section className="pres pres--right">
        <div className="pres__photo"
          style={{ backgroundImage:`url('${CDN}v1733858906/sezione__logo.jpg')` }} />
        <div className="pres__text">
          <div className="pres__label">Per la tua attività</div>
          <h2 className="pres__title">
            Il tuo logo,<br />il tuo stile
          </h2>
          <p>
            Il nostro servizio di personalizzazione esclusiva ti permette di creare
            un orologio che diventa un emblema unico della tua attività. Logo
            aziendale, nome del brand o simbolo significativo: lo integriamo nel
            design con attenzione ai minimi dettagli.
          </p>
          <p>
            Ogni progetto inizia con un dialogo personalizzato: ti presenteremo una
            proposta su misura che potrai visualizzare e approvare prima della
            realizzazione.
          </p>
          <a href="https://wa.me/390922437493" target="_blank" rel="noopener noreferrer"
             className="pres__cta">
            Contattaci su WhatsApp →
          </a>
        </div>
      </section>

      {/* ── PROMISE BAND ──────────────────────────────────────────────────────── */}
      <section className="promise">
        {[
          { icon:"✦", title:"100% Artigianale", desc:"Ogni orologio è realizzato a mano nella nostra bottega in Sicilia." },
          { icon:"◈", title:"Specchio autentico", desc:"Materiali di alta qualità selezionati per durare nel tempo." },
          { icon:"⊕", title:"Spedizione sicura", desc:"Imballaggio protettivo dedicato per ogni ordine." },
          { icon:"◇", title:"Garanzia soddisfatto", desc:"Supporto diretto dal produttore per ogni esigenza." },
        ].map(p => (
          <div key={p.title} className="promise__item">
            <div className="promise__icon">{p.icon}</div>
            <div className="promise__title">{p.title}</div>
            <div className="promise__desc">{p.desc}</div>
          </div>
        ))}
      </section>

      <style suppressHydrationWarning>{`
        /* ── Hero ───────────────────────────────────────────────────────────── */
        .hero {
          position: relative;
          height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          color: white;
        }
        .hero__bg {
          position: absolute; inset: 0;
        }
        /* Each image:
           N=6 images, total cycle = N×6 = 36s, each slot = 6s
           Keyframe timeline (% of 36s):
             0%→3%  : fade in  (0s→1s)
             3%→14% : hold     (1s→5s)
             14%→17%: fade out (5s→6s) ← overlaps with next image fading in
             17%→100%: opacity 0 (hidden until next loop)
           animation-fill-mode:both so images start hidden before their delay */
        .hero__bg-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: brightness(.72) saturate(.88);
          opacity: 0;
          animation: hero-fade 36s linear infinite both;
        }
        @keyframes hero-fade {
          0%   { opacity: 0; }
          3%   { opacity: 1; }
          14%  { opacity: 1; }
          17%  { opacity: 0; }
          100% { opacity: 0; }
        }
        .hero__overlay {
          position:absolute; inset:0;
          background: linear-gradient(
            135deg,
            rgba(26,22,18,.7) 0%,
            rgba(26,22,18,.35) 50%,
            rgba(26,22,18,.15) 100%
          );
        }
        .hero__content {
          position: relative; z-index: 10;
          max-width: 680px;
          padding: 3rem 3.5rem;
          text-align: center;
                  }
        .hero__label {
          font-size:.72rem; letter-spacing:.22em; text-transform:uppercase;
          color:rgba(255,255,255,.65); margin-bottom:1.25rem;
        }
        .hero__title {
          font-family:var(--font-serif);
          font-size:clamp(2.4rem,6vw,5rem);
          font-weight:300; line-height:1.08;
          margin-bottom:1.25rem;
        }
        .hero__title em { color:var(--gold); font-style:italic; display:block; }
        .hero__sub {
          font-size:.97rem; line-height:1.7;
          color:rgba(255,255,255,.78);
          margin-bottom:2.25rem;
        }
        .hero__actions { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
        .btn-hero-primary {
          font-size:.73rem; letter-spacing:.14em; text-transform:uppercase;
          padding:.9rem 2.25rem;
          background:white; color:var(--ink);
          text-decoration:none;
          transition:background .2s, transform .15s;
        }
        .btn-hero-primary:hover { background:var(--gold); transform:translateY(-2px); }
        .btn-hero-ghost {
          font-size:.73rem; letter-spacing:.14em; text-transform:uppercase;
          padding:.9rem 2.25rem;
          background:transparent; color:white;
          border:1px solid rgba(255,255,255,.5);
          text-decoration:none;
          transition:border-color .2s, background .2s, transform .15s;
        }
        .btn-hero-ghost:hover { border-color:white; background:rgba(255,255,255,.1); transform:translateY(-2px); }
        .hero__scroll {
          position:absolute; bottom:2rem; left:50%; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:.5rem;
          color:rgba(255,255,255,.5); font-size:.65rem; letter-spacing:.12em; text-transform:uppercase;
          z-index:10;
        }
        .hero__scroll-line {
          width:1px; height:40px;
          background:linear-gradient(to bottom,rgba(255,255,255,.6),transparent);
          animation:scroll-pulse 1.8s ease-in-out infinite;
        }
        @keyframes scroll-pulse { 0%,100%{opacity:.4} 50%{opacity:1} }

        /* ── Stats ──────────────────────────────────────────────────────────── */
        .stats {
          display:grid; grid-template-columns:repeat(4,1fr);
          background:var(--ink);
        }
        .stats__item {
          padding:2rem 1.5rem; text-align:center;
          border-right:1px solid rgba(255,255,255,.08);
        }
        .stats__item:last-child { border-right:none; }
        .stats__n {
          font-family:var(--font-serif); font-size:2.4rem; font-weight:300;
          color:var(--gold);
        }
        .stats__label {
          font-size:.68rem; letter-spacing:.12em; text-transform:uppercase;
          color:rgba(255,255,255,.5); margin-top:.35rem;
        }

        /* ── Presentation sections ──────────────────────────────────────────── */
        .pres {
          display:grid; grid-template-columns:1fr 1fr;
          min-height:70vh;
        }
        .pres--left  .pres__photo { order:2; }
        .pres--left  .pres__text  { order:1; }
        .pres__photo {
          background-size:cover; background-position:center;
          min-height:420px;
        }
        .pres__text {
          padding:5rem 4.5rem;
          display:flex; flex-direction:column; justify-content:center; gap:1.25rem;
          background:var(--cream);
        }
        .pres__label {
          font-size:.68rem; letter-spacing:.18em; text-transform:uppercase;
          color:var(--muted);
        }
        .pres__title {
          font-family:var(--font-serif);
          font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:300; line-height:1.15;
          color:var(--ink);
        }
        .pres__text p { font-size:.9rem; line-height:1.75; color:var(--muted); }
        .pres__cta {
          font-size:.72rem; letter-spacing:.1em; text-transform:uppercase;
          color:var(--brown); text-decoration:none; margin-top:.5rem;
          transition:color .2s;
        }
        .pres__cta:hover { color:var(--ink); }

        /* ── Featured clocks ────────────────────────────────────────────────── */
        .featured {
          padding:5rem 2.5rem;
          background:var(--cream-dark);
        }
        .featured__header { text-align:center; margin-bottom:3rem; }
        .featured__label  { font-size:.68rem; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); }
        .featured__title  { font-family:var(--font-serif); font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:300; color:var(--ink); margin:.4rem 0 .75rem; }
        .featured__sub    { font-size:.88rem; color:var(--muted); max-width:520px; margin:0 auto; line-height:1.6; }
        .featured__grid   {
          display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem;
          max-width:1280px; margin:0 auto;
        }
        .feat-card {
          background:white; text-decoration:none; display:flex; flex-direction:column;
          transition:transform .2s, box-shadow .2s;
        }
        .feat-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,.12); }
        .feat-card__img  { background:var(--cream-dark); padding:1.75rem; aspect-ratio:1; }
        .feat-card__body { padding:1rem 1.25rem 1.25rem; display:flex; flex-direction:column; gap:.3rem; }
        .feat-card__name { font-family:var(--font-serif); font-size:1rem; color:var(--ink); }
        .feat-card__desc { font-size:.75rem; color:var(--muted); line-height:1.5; }
        .feat-card__price{ font-size:.78rem; color:var(--brown); margin-top:.25rem; }
        .featured__more  { text-align:center; margin-top:3rem; }
        .btn-outline-dark {
          font-size:.72rem; letter-spacing:.12em; text-transform:uppercase;
          padding:.8rem 2rem; border:1px solid var(--ink);
          color:var(--ink); text-decoration:none; background:transparent;
          transition:background .2s, color .2s;
          display:inline-block;
        }
        .btn-outline-dark:hover { background:var(--ink); color:white; }

        /* ── Custom band ────────────────────────────────────────────────────── */
        .custom-band {
          position:relative; min-height:60vh;
          display:flex; align-items:center; justify-content:center;
          overflow:hidden;
          color:white; text-align:center;
        }
        .custom-band__photo {
          position:absolute; inset:0;
          background-size:cover; background-position:center;
          filter:brightness(.55) saturate(.85);
        }
        .custom-band__overlay {
          position:absolute; inset:0;
          background:rgba(26,22,18,.4);
        }
        .custom-band__content {
          position:relative; z-index:2;
          max-width:600px; padding:0 2.5rem;
          display:flex; flex-direction:column; align-items:center; gap:1.25rem;
        }
        .custom-band__label {
          font-size:.7rem; letter-spacing:.2em; text-transform:uppercase;
          color:var(--gold);
        }
        .custom-band__title {
          font-family:var(--font-serif);
          font-size:clamp(2rem,5vw,3.8rem); font-weight:300; line-height:1.1;
        }
        .custom-band p { font-size:.9rem; color:rgba(255,255,255,.75); line-height:1.7; }


        /* ── Video section ──────────────────────────────────────────────────────── */
        .video-section { background:var(--ink); color:white; padding:5rem 2.5rem; }
        .video-section__inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1.4fr; gap:4rem; align-items:center; }
        .video-section__label { font-size:.68rem; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:.75rem; }
        .video-section__title { font-family:var(--font-serif); font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:300; line-height:1.12; margin-bottom:1.5rem; }
        .video-section__text p { font-size:.88rem; line-height:1.75; color:rgba(255,255,255,.65); margin-bottom:.75rem; }
        .video-section__video { border-radius:2px; overflow:hidden; box-shadow:0 24px 64px rgba(0,0,0,.5); border:1px solid rgba(255,255,255,.08); }
        .video-section__video video { width:100%; height:auto; display:block; max-height:500px; object-fit:cover; }

        /* ── Promise band ───────────────────────────────────────────────────── */
        .promise {
          display:grid; grid-template-columns:repeat(4,1fr);
          background:white;
        }
        .promise__item {
          padding:2.5rem 2rem; text-align:center;
          border-right:1px solid var(--cream-dark);
          display:flex; flex-direction:column; align-items:center; gap:.6rem;
        }
        .promise__item:last-child { border-right:none; }
        .promise__icon { font-size:1.5rem; color:var(--brown-light); }
        .promise__title { font-family:var(--font-serif); font-size:.95rem; color:var(--ink); }
        .promise__desc  { font-size:.75rem; color:var(--muted); line-height:1.6; max-width:180px; }

        /* ── Responsive ─────────────────────────────────────────────────────── */
        @media (max-width:1100px) {
          .featured__grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:768px) {
          .video-section { padding:3rem 1.25rem; }
          .video-section__inner { grid-template-columns:1fr; gap:2rem; }
          .pres { grid-template-columns:1fr; }
          .pres--left .pres__photo,
          .pres--left .pres__text  { order:unset; }
          .pres__photo { min-height:280px; }
          .pres__text  { padding:2.5rem 1.5rem; }
          .stats { grid-template-columns:repeat(2,1fr); }
          .stats__item:nth-child(2) { border-right:none; }
          .promise { grid-template-columns:repeat(2,1fr); }
          .promise__item:nth-child(2) { border-right:none; }
          .featured { padding:3rem 1.25rem; }
          .featured__grid { grid-template-columns:1fr 1fr; }
          .hero__content { padding:0 1.5rem; }
        }
        @media (max-width:480px) {
          .featured__grid { grid-template-columns:1fr; }
          .stats  { grid-template-columns:repeat(2,1fr); }
          .promise{ grid-template-columns:1fr; }
          .promise__item { border-right:none; border-bottom:1px solid var(--cream-dark); }
        }
      `}</style>
    </div>
  );
}
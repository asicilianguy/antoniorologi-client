"use client";
import { useState, useEffect } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Close on route change / scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        className="hamburger"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        aria-expanded={open}
      >
        <span className={`hamburger__line ${open ? "open" : ""}`} />
        <span className={`hamburger__line ${open ? "open" : ""}`} />
        <span className={`hamburger__line ${open ? "open" : ""}`} />
      </button>

      {/* Overlay + drawer */}
      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)} />
      )}

      <nav className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}>
        <a href="/i-nostri-orologi" className="mobile-nav__link"
           onClick={() => setOpen(false)}>
          I nostri orologi
        </a>
        <a href="/il-tuo-orologio" className="mobile-nav__link"
           onClick={() => setOpen(false)}>
          Il tuo orologio
        </a>
        <a href="https://wa.me/390922437493"
           target="_blank" rel="noopener noreferrer"
           className="mobile-nav__cta"
           onClick={() => setOpen(false)}>
          Contattaci
        </a>
      </nav>

      <style>{`
        /* Hamburger — hidden on desktop */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 201;
          position: relative;
        }
        .hamburger__line {
          display: block;
          height: 1.5px;
          background: var(--ink);
          transition: transform 0.25s ease, opacity 0.2s ease, width 0.25s ease;
          transform-origin: center;
        }
        /* Animate to X */
        .hamburger__line:nth-child(1).open { transform: translateY(6.5px) rotate(45deg); }
        .hamburger__line:nth-child(2).open { opacity: 0; transform: scaleX(0); }
        .hamburger__line:nth-child(3).open { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(26,22,18,.45);
          backdrop-filter: blur(3px);
          z-index: 199;
          animation: fade-in .2s ease;
        }
        .mobile-nav {
          display: none;
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(280px, 80vw);
          height: 100dvh;         /* explicit full height */
          background: white;
          background-clip: padding-box; /* prevent bleed */
          z-index: 200;
          flex-direction: column;
          padding: calc(var(--nav-h) + 1.5rem) 2rem 2rem;
          gap: .25rem;
          transform: translateX(100%);
          transition: transform .3s cubic-bezier(.4,0,.2,1);
          box-shadow: -8px 0 32px rgba(0,0,0,.12);
          overflow-y: auto;
        }
        .mobile-nav--open { transform: translateX(0); }
        .mobile-nav__link {
          font-size: .78rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          padding: .9rem 0;
          border-bottom: 1px solid var(--cream-dark);
          transition: color .2s;
        }
        .mobile-nav__link:hover { color: var(--ink); }
        .mobile-nav__cta {
          font-size: .72rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: white;
          background: var(--brown);
          text-decoration: none;
          padding: .9rem 1.5rem;
          text-align: center;
          margin-top: 1rem;
          transition: background .2s;
        }
        .mobile-nav__cta:hover { background: var(--ink); }

        @keyframes fade-in { from{opacity:0} to{opacity:1} }

        @media (max-width: 768px) {
          .hamburger      { display: flex; }
          .mobile-overlay { display: block; }
          .mobile-nav     { display: flex; }
        }
      `}</style>
    </>
  );
}
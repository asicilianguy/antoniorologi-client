import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:       "Antonio Orologi — Orologi da parete in specchio",
  description: "Orologi da parete artigianali in specchio, realizzati a mano in Sicilia. Personalizzabili in ogni dettaglio.",
  openGraph: {
    title:       "Antonio Orologi",
    description: "Orologi da parete artigianali in specchio",
    type:        "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300..900;1,6..96,300..900&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import MobileNav from "../components/MobileNav";

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="nav">
      <a href="/" className="nav__logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photo/logo.png" alt="Antonio Orologi" className="nav__logo-img" />
      </a>
      {/* Desktop links */}
      <nav className="nav__links">
        <a href="/i-nostri-orologi" className="nav__link">I nostri orologi</a>
        <a href="/il-tuo-orologio"  className="nav__link">Il tuo orologio</a>
        <a href="https://wa.me/390922437493" target="_blank" rel="noopener noreferrer"
           className="nav__cta">Contattaci</a>
      </nav>
      {/* Mobile hamburger */}
      <MobileNav />
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Antonio Orologi</span>
          <p>Orologi da parete artigianali in specchio. Realizzati a mano in Sicilia.</p>
        </div>
        <div className="footer__cols">
          <div>
            <div className="footer__col-title">Pagine</div>
            <a href="/i-nostri-orologi">I nostri orologi</a>
            <a href="/il-tuo-orologio">Il tuo orologio</a>
          </div>
          <div>
            <div className="footer__col-title">Contatti</div>
            <a href="tel:+390922437493">+39 0922 437493</a>
            <a href="mailto:info@antoniorologi.it">info@antoniorologi.it</a>
            <a href="https://wa.me/390922437493" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        © {new Date().getFullYear()} Vetreria Cipolla Francesco — P.IVA 01671540845
      </div>
    </footer>
  );
}
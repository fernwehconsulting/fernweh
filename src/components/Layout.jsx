import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { site } from '../content/site.js';
import { WhatsApp } from './Icons.jsx';

// Pages without the fixed bottom contact bar on mobile
const NO_MOBILE_CTA = ['/iletisim', '/impressum', '/gizlilik'];
const noClass = () => undefined;

export default function Layout() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ctaShow, setCtaShow] = useState(false);
  const showCta = !NO_MOBILE_CTA.includes(pathname);

  useEffect(() => { document.body.classList.toggle('has-mobile-cta', showCta); }, [showCta]);
  useEffect(() => { document.body.classList.toggle('menu-open', menuOpen); }, [menuOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 900) setMenuOpen(false); };
    const onScroll = () => setCtaShow(window.scrollY > 280);
    onScroll();
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // New page: close the menu, go to the top (or to #section)
  useEffect(() => {
    setMenuOpen(false);
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const t = setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el) return;
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - pad });
    }, 60);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  // Fade-in of .reveal blocks while scrolling
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Links written inside Markdown / content files (e.g. [Paketler](/paketler)) open without a reload
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/') || a.target || /\.[a-z0-9]+($|#)/i.test(href)) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  const mainNav = site.nav.filter((n) => n.to !== '/' && n.to !== '/iletisim');

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <Link className="brand" to="/" aria-label="Fernweh Consulting ana sayfa"><span className="brand-a">fernweh</span><span className="brand-b">consulting</span></Link>
          <nav className="site-nav" aria-label="Ana menü">
            <ul>
              {mainNav.map((n) => (
                <li key={n.to}><NavLink className={() => 'nav-link'} to={n.to}>{n.label}</NavLink></li>
              ))}
              <li><NavLink className={() => 'btn btn--primary'} to="/iletisim">İletişim</NavLink></li>
            </ul>
          </nav>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen ? 'true' : 'false'} aria-controls="mobile-menu" onClick={() => setMenuOpen((o) => !o)}>
            <span className="label">{menuOpen ? 'Kapat' : 'Menü'}</span><span className="bars"></span>
          </button>
        </div>
      </header>

      <div className="mobile-menu" id="mobile-menu">
        <ul>
          {site.nav.map((n, i) => (
            <li key={n.to}>
              <NavLink to={n.to} end={n.to === '/'} className={noClass} onClick={() => setMenuOpen(false)}>
                {n.label}<span>{String(i + 1).padStart(2, '0')}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-foot">
          <a href={site.whatsappUrl} target="_blank" rel="noopener">WhatsApp · {site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <Link className="brand" to="/"><span className="brand-a">fernweh</span><span className="brand-b">consulting</span></Link>
              <p className="footer-tag">{site.tagline}</p>
            </div>
            <div className="footer-col">
              <h4>Sayfalar</h4>
              <ul>
                {site.nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
              </ul>
            </div>
            <div className="footer-col">
              <h4>İletişim</h4>
              <ul>
                <li><a href={site.whatsappUrl} target="_blank" rel="noopener">{site.phone}</a></li>
                <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
                <li>{site.location}</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{site.copyright}</span>
            <span className="footer-legal"><Link to="/impressum">Impressum</Link><Link to="/gizlilik">Gizlilik</Link></span>
          </div>
        </div>
      </footer>

      {showCta && (
        <div className={'mobile-cta' + (ctaShow ? ' show' : '')}>
          <Link className="btn btn--primary" to="/iletisim">Ücretsiz Ön Görüşme</Link>
          <a className="btn btn--wa" href={site.whatsappUrl} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsApp /></a>
        </div>
      )}
    </>
  );
}

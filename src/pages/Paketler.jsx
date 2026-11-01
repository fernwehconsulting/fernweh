import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand.jsx';
import { ArrowRight, Pdf } from '../components/Icons.jsx';
import { packages, singleSessions, formatPrice } from '../content/packages.js';
import { site } from '../content/site.js';
import usePageMeta from '../lib/usePageMeta.js';

function PackageBlock({ p, index }) {
  return (
    <article className={'pkg-block' + (p.featured ? ' pkg-block--featured' : '')} id={p.id} style={p.featured ? { overflow: 'visible' } : undefined}>
      <div className="pkg-side">
        {p.featured && <br />}
        <span className="pkg-num">{String(index + 1).padStart(2, '0')}</span>
        <h2 className="h2">{p.name}</h2>
        <p className="pkg-sub">{p.subtitle}</p>
        <div className="price">{formatPrice(p.price)} € <small>tek seferlik</small></div>
        <div className="facts">{p.facts.map((f) => <span className="fact" key={f}>{f}</span>)}</div>
        <Link className="btn btn--primary" to="/iletisim">{p.button} <ArrowRight /></Link>
      </div>
      <div className="pkg-main">
        <p>{p.description}</p>
        {p.sessions && (
          <>
            <h3>Seanslar</h3>
            <ol className="steps">
              {p.sessions.map((s, i) => <li key={i}><strong>Seans {i + 1}</strong><span>{s}</span></li>)}
            </ol>
          </>
        )}
        {p.includes && (
          <>
            <h3>Neler dahil</h3>
            <ul className="check-list">
              {p.includes.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </>
        )}
        {p.noteBox && <div className="note-box"><strong>{p.noteBox.title}</strong>{p.noteBox.text}</div>}
        {p.footnote && <p className="note">{p.footnote}</p>}
      </div>
    </article>
  );
}

export default function Paketler() {
  usePageMeta(
    'Paketler · Fernweh Consulting',
    'Avrupa Danışmanlık Paketi, Almanya Her Şey Dahil Paket, Avrupa Staj Danışmanlığı ve tek seanslık danışmanlıklar.'
  );

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">Paketler</div>
          <h1 className="h1">Yurt dışı eğitim <em>danışmanlığı</em></h1>
          <p className="lead">İhtiyacınıza ve sürecinizdeki aşamaya uygun üç paket ve tek konuda destek almak isteyenler için tek seanslık danışmanlıklar.</p>
          <nav className="chips" aria-label="Sayfa içi"></nav>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '56px' }}>
        <div className="wrap">
          {packages.map((p, i) => <PackageBlock p={p} index={i} key={p.id} />)}
        </div>
      </section>

      <section className="section section--white" id="tek-seans">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="kicker">Tek seanslık</div>
              <h2 className="h2">Tek seanslık <em>danışmanlık paketleri</em></h2>
            </div>
            <p className="lead">Başvuru sürecini kendiniz yürütüp tek bir konuda destek almak isterseniz.</p>
          </div>
          <div className="seans-grid reveal">
            {singleSessions.map((s) => (
              <div className="seans" key={s.title}>
                <div className="seans-head"><h3>{s.title}</h3><span className="seans-price">{formatPrice(s.price)} €</span></div>
                <p>{s.text}</p>
              </div>
            ))}
          </div>

          <div className="pdf-card reveal" style={{ marginTop: '56px' }}>
            <div>
              <h3 className="h3">Tüm paket detayları</h3>
              <p>Paketlerin ve seansların tam açıklamasını PDF olarak indirin.</p>
            </div>
            <a className="btn btn--light" href={site.packagesPdf} target="_blank" rel="noopener"><Pdf /> PDF'i aç</a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

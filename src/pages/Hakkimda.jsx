import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand.jsx';
import { ArrowRight } from '../components/Icons.jsx';
import { about } from '../content/about.js';
import usePageMeta from '../lib/usePageMeta.js';

export default function Hakkimda() {
  usePageMeta(
    'Hakkımda · Ayşe Şahin · Fernweh Consulting',
    "Ayşe Şahin: psikolog ve eğitim danışmanı. Ege Üniversitesi, Erasmus Hollanda ve İspanya, Almanya'da yüksek lisans."
  );

  return (
    <>
      <div className="wrap about-hero">
        <img className="portrait" src="/images/ayse.webp" alt="Ayşe Şahin" width="900" height="1260" />
        <div>
          <div className="kicker">Hakkımda</div>
          <h1 className="h1">Merhaba, <em>ben Ayşe!</em></h1>
          <p className="lead" style={{ marginBottom: '32px' }}>{about.lead}</p>
          <div className="prose">
            {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="btn-row btn-row--stack" style={{ marginTop: '32px' }}>
            <Link className="btn btn--primary" to="/paketler">Paketleri incele <ArrowRight /></Link>
            <Link className="btn btn--ghost" to="/rehberler">Rehberleri oku</Link>
          </div>
        </div>
      </div>

      <section className="section section--ink">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="kicker">Yolculuğum</div>
              <h2 className="h2">Dört ülke, <em>tek bir yol.</em></h2>
            </div>
            <p className="lead">Size anlattığım her adımı önce kendim attım.</p>
          </div>
          <ol className="timeline reveal">
            {about.timeline.map((t, i) => (
              <li key={i} className={t.now ? 'tl-now' : undefined}>
                <span className="tl-year">{t.year}</span>
                <div className="tl-body">
                  <span className="tl-kind">{t.kind}</span>
                  <span className="tl-title">{t.title}</span>
                  <span className="tl-place">{t.place}</span>
                  {t.note && <p className="tl-note">{t.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

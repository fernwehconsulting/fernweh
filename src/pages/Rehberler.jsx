import CtaBand from '../components/CtaBand.jsx';
import { ArticleCard, FeatureCard } from '../components/GuideCards.jsx';
import { guides } from '../lib/guides.js';
import usePageMeta from '../lib/usePageMeta.js';

export default function Rehberler() {
  usePageMeta(
    'Rehberler · Fernweh Consulting',
    "Avrupa'da hangi ülkede okumalı, Almanya, Hollanda ve İtalya'da öğrenci yaşam masrafları."
  );
  const featured = guides.find((g) => g.featured);
  const rest = guides.filter((g) => g !== featured);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">Rehberler</div>
          <h1 className="h1">Avrupa'da eğitim <em>rehberleri</em></h1>
          <p className="lead">Ülke seçiminden yaşam masraflarına, kendi deneyimlerimden ve 2026 güncel verilerinden yola çıkarak hazırladığım ücretsiz rehberler.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: '48px' }}>
        <div className="wrap">
          {featured && <FeatureCard guide={featured} />}
          <div className="article-grid">
            {rest.map((g) => <ArticleCard guide={g} key={g.slug} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import CtaBand from '../components/CtaBand.jsx';
import Flag from '../components/Flag.jsx';
import { ArticleCard } from '../components/GuideCards.jsx';
import { site } from '../content/site.js';
import { getGuide, guides } from '../lib/guides.js';
import { inline, renderMarkdown } from '../lib/markdown.js';
import usePageMeta from '../lib/usePageMeta.js';

export default function Rehber() {
  const { slug } = useParams();
  const guide = getGuide(slug);
  const rendered = useMemo(() => (guide ? renderMarkdown(guide.body, { numbered: true }) : null), [guide]);
  usePageMeta(guide ? `${guide.cardTitle} · Fernweh Consulting` : 'Rehberler · Fernweh Consulting', guide?.description);

  if (!guide) return <Navigate to="/rehberler" replace />;
  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <header className="article-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Konum"><Link to="/">Ana Sayfa</Link><span>/</span><Link to="/rehberler">Rehberler</Link></nav>
          <Flag code={guide.flag} large />
          <div className="kicker">{guide.kicker}</div>
          <h1 className="h1" dangerouslySetInnerHTML={{ __html: inline(guide.title) }} />
          <p className="lead">{guide.lead}</p>
          <div className="meta"><span>{site.author} · {site.authorTitle}</span><span>{guide.readTime}</span></div>
        </div>
      </header>

      <div className="wrap article-layout">
        <details className="toc" open>
          <summary>İçindekiler</summary>
          <ol>
            {rendered.toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>)}
          </ol>
        </details>
        <article className="prose" dangerouslySetInnerHTML={{ __html: rendered.html }} />
      </div>

      {others.length > 0 && (
        <section className="section section--white more-articles">
          <div className="wrap">
            <div className="section-head section-head--stack reveal"><div><div className="kicker">Devamını okuyun</div><h2 className="h2">Diğer <em>rehberler</em></h2></div></div>
            <div className="article-grid">
              {others.map((g) => <ArticleCard guide={g} key={g.slug} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

import { Link } from 'react-router-dom';
import { site } from '../content/site.js';
import Flag from './Flag.jsx';
import { ArrowRight } from './Icons.jsx';

// Small guide card used on Rehberler and under each guide
export function ArticleCard({ guide }) {
  return (
    <Link className="article-card reveal" to={`/rehberler/${guide.slug}`}>
      <Flag code={guide.flag} />
      <div>
        <div className="guide-row-meta">{guide.kicker}</div>
        <h3>{guide.cardTitle}</h3>
        <p>{guide.description}</p>
        <div className="meta"><span>{guide.readTime}</span><span>{site.author}</span></div>
      </div>
    </Link>
  );
}

// Large highlighted card at the top of Rehberler
export function FeatureCard({ guide }) {
  return (
    <Link className="feature-article reveal" to={`/rehberler/${guide.slug}`}>
      <div className="feature-cover">
        <Flag code={guide.flag} />
        <div className="feature-cover-title" dangerouslySetInnerHTML={{ __html: guide.coverTitle || guide.cardTitle }} />
      </div>
      <div>
        <div className="guide-row-meta">Öne çıkan · {guide.kicker}</div>
        <h2 className="h2">{guide.cardTitle}</h2>
        <p className="lead">{guide.description}</p>
        <div className="meta"><span>{guide.readTime}</span><span>{site.author}</span></div>
        <div style={{ marginTop: '24px' }}><span className="link-arrow">Rehberi oku <ArrowRight /></span></div>
      </div>
    </Link>
  );
}

// Compact row used on the home page
export function GuideRow({ guide }) {
  return (
    <Link className="guide-row" to={`/rehberler/${guide.slug}`}>
      <Flag code={guide.flag} />
      <div>
        <div className="guide-row-meta">{guide.category}</div>
        <div className="guide-row-title">{guide.cardTitle}</div>
      </div>
      <span className="guide-row-arrow"><ArrowRight /></span>
    </Link>
  );
}

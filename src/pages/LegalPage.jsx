import { useMemo } from 'react';
import { inline, parseFrontmatter, renderMarkdown } from '../lib/markdown.js';
import usePageMeta from '../lib/usePageMeta.js';

// Gizlilik — text lives in src/content/pages/gizlilik.md
export default function LegalPage({ source }) {
  const { data, html } = useMemo(() => {
    const { data, body } = parseFrontmatter(source);
    return { data, html: renderMarkdown(body).html };
  }, [source]);
  usePageMeta(`${String(data.title).replace(/[*_]/g, '')} · Fernweh Consulting`);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">{data.kicker}</div>
          <h1 className="h1" dangerouslySetInnerHTML={{ __html: inline(data.title) }} />
        </div>
      </section>
      <div className="wrap legal" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

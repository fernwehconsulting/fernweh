import { parseFrontmatter } from './markdown.js';

// Every .md file in src/content/guides becomes a guide automatically.
// The file name is the address: almanya-yasam-masraflari.md → /rehberler/almanya-yasam-masraflari
const files = import.meta.glob('../content/guides/*.md', { query: '?raw', import: 'default', eager: true });

export const guides = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(raw);
    return { slug, ...data, body };
  })
  .filter((g) => g.draft !== true)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const getGuide = (slug) => guides.find((g) => g.slug === slug);

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Fernweh Consulting (study-abroad consulting, Berlin). React 18 + Vite 5 + react-router-dom 6, deployed to GitHub Pages at `fernwehconsulting.github.io`. All user-facing text is **Turkish**; Gizlilik (`src/content/pages/gizlilik.md`) is the privacy-policy page. The site owner is non-technical and edits content files directly (see README.md), so content files must stay simple, copy-pasteable JS/Markdown.

## Commands

```
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # vite build + scripts/spa-fallback.mjs (copies dist/index.html → dist/404.html)
npm run preview   # serve the built dist/
```

There are no tests, linter, or formatter configured. `npm run build` is the only correctness check.

## Architecture

**Content/code split.** `src/content/` holds all editable data; `src/pages/` and `src/components/` only render it. When changing text, prices, reviews, FAQ, contact details or nav, edit `src/content/*.js` (`site.js`, `packages.js`, `reviews.js`, `faq.js`, `about.js`, `flags.js`), not the JSX. Keep the existing comments in content files — they are instructions for the owner.

**Guides are file-based.** `src/lib/guides.js` uses `import.meta.glob('../content/guides/*.md', { query: '?raw', eager: true })`; each file's name is its slug (`/rehberler/<slug>`). Guides are sorted by frontmatter `order`, hidden with `draft: true`. Frontmatter fields used by pages/cards: `title` (may contain `*italic*`), `cardTitle`, `kicker`, `category`, `description`, `lead`, `readTime`, `flag` (key in `flags.js`), `order`, `featured`, `coverTitle`.

**Custom Markdown pipeline (`src/lib/markdown.js`).**
- `parseFrontmatter` is a hand-rolled flat `key: value` parser (no YAML: no quoting, nesting or lists; `true`/`false`/numbers are coerced). Values are split on the first `:` only.
- `renderMarkdown(body, { numbered })` pre-processes lines before `marked`:
  - `:::type args … :::` container blocks → `callout`, `callout-dark`, `country <flag> <name>`, `profile "Title" | Rec`, `table-note`, `disclaimer` (unknown types fall back to plain markdown). Container inner content is rendered with `marked.parseInline`, so block-level markdown inside them doesn't work.
  - `## Heading {#id}` → with `numbered: true` (guides) gets `01`, `02`… prefixes and is collected into the TOC; id falls back to a Turkish-aware slug.
  - Post-processing: tables wrapped in `.table-wrap`; rows whose first cell contains "toplam" get `class="total"`; `<ol><li>` contents wrapped in `<span>` for CSS numbering.
- Output is injected via `dangerouslySetInnerHTML`; CSS class names emitted here must match `src/styles/site.css`.

**Routing (`src/App.jsx`).** All routes nest under `Layout`. The `*` route is a `Fallback` that redirects legacy `.html` URLs from the old static site (`/egitim.html` → `/paketler`, `/rehber-<slug>.html` → `/rehberler/<slug>`, etc.) and everything else to `/`. Direct deep links work on GitHub Pages only because of the generated `404.html` SPA fallback.

**Layout (`src/components/Layout.jsx`)** owns cross-page behavior: header/mobile menu/footer built from `site.nav`, scroll-to-top or `#hash` on navigation, `.reveal` fade-in via IntersectionObserver (re-run on pathname change), the mobile bottom CTA (hidden on paths in `NO_MOBILE_CTA`), and a global click handler that turns plain `<a href="/...">` links inside Markdown-rendered HTML into client-side navigations (skips links with a file extension, e.g. PDFs).

**Page meta.** `usePageMeta(title, description)` sets `document.title` and the meta description client-side; static OG/Twitter tags and Google Fonts (Playfair Display, Poppins) are in `index.html`.

**Styling.** One global stylesheet, `src/styles/site.css`, with design tokens as CSS variables at the top (`--ink`, `--olive`, …). No CSS modules or framework.

**Static assets.** `public/images/` and `public/Fernweh_Consulting_Paketler.pdf` are linked by absolute path; renaming the PDF breaks `site.packagesPdf` (used on the Paketler page).

## Deployment

README says to push to `main` with GitHub Pages source set to "GitHub Actions", but no workflow file exists in `.github/` in this checkout — one would need to be added (build with `npm run build`, publish `dist/`). `vite.config.js` uses `base: '/'` because it's a user/org Pages site served at the domain root.

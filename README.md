# Fernweh Consulting — website

React + Vite. The look is the same as the old HTML site; the difference is that **texts, prices, reviews and guides now live in simple content files**, so you rarely need to touch the code.

## Where to change things

| What | File |
| --- | --- |
| Prices, package texts, sessions, "Neler dahil" | `src/content/packages.js` |
| Single sessions (CV, Motivasyon Mektubu) | `src/content/packages.js` → `singleSessions` |
| Reviews | `src/content/reviews.js` |
| FAQ | `src/content/faq.js` |
| Hakkımda text + timeline | `src/content/about.js` |
| Phone, WhatsApp, e-mail, Google Form link, menu | `src/content/site.js` |
| Guides (Rehberler) | `src/content/guides/*.md` |
| Impressum / Gizlilik | `src/content/pages/*.md` |
| Images | `public/images/` |
| PDFs | `public/` (same file name = links keep working) |
| Colors, fonts, spacing | `src/styles/site.css` (top of the file: `--ink`, `--olive`, …) |
| Page layouts (rarely needed) | `src/pages/*.jsx` |

Content files are plain JavaScript lists. Keep the quotes and commas as they are — copy an existing item, paste it, and change the text. If a text contains an apostrophe (`'`), wrap it in double quotes `"..."` (like the existing ones).

### Examples

**Change a price** — in `packages.js`: `price: 1450,` (just the number; it is shown as "1.450 €").

**Add a review** — in `reviews.js`, copy one `{ … },` block and edit it. Order in the file = order on the site.

**Add a guide** — create a new file in `src/content/guides/`, e.g. `fransa-yasam-masraflari.md`. The file name becomes the address: `/rehberler/fransa-yasam-masraflari`. It shows up automatically on the home page, on Rehberler and under the other guides. Easiest: copy an existing guide and edit it.

The top of each guide:

```
---
title: Fransa'da öğrenci *yaşam masrafları*     (*…* = italic part)
cardTitle: Fransa'da öğrenci yaşam masrafları   (title on cards)
kicker: Yaşam masrafları · 2026
category: Yaşam masrafları · 2026               (small label on the home page)
description: One sentence for cards and Google.
lead: The intro paragraph under the title.
readTime: 4 dk okuma
pdf: /Fransa_Yasam_Masraflari_2026.pdf          (optional; put the PDF in public/)
flag: fr                                        (see src/content/flags.js)
order: 5                                        (position in lists)
---
```

Optional: `featured: true` + `coverTitle:` for the big card on Rehberler, `draft: true` to hide a guide.

Inside a guide, normal Markdown works (`**bold**`, `*italic*`, `- lists`, `1. lists`, tables, `[link](/paketler)`). Extras:

```
## Section title {#short-id}        → numbered section + table of contents entry

:::callout Box title
Text of the box.
:::

:::callout-dark Yorum
Dark box.
:::

:::country de Almanya
Country profile text (flag code + name).
:::

:::profile "Bütçem kısıtlı" | Öneri: Almanya · İtalya
Profile text.
:::

:::table-note
Small note under a table.
:::

:::disclaimer
Small print at the end.
:::
```

Table rows whose first cell contains "toplam" are shown bold as total rows.

## Working on your computer

Needs [Node.js](https://nodejs.org) (LTS).

```
npm install      # once
npm run dev      # opens a live preview at http://localhost:5173 — updates as you save
npm run build    # optional: checks that everything builds
```

## Publishing (GitHub Pages)

1. Put the contents of this folder at the root of your `fernwehconsulting.github.io` repository (replacing the old HTML files).
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions** (one-time).
3. Push / commit to `main`. The site builds and goes live automatically in ~1–2 minutes (see the **Actions** tab).

Old addresses like `/egitim.html` or `/rehber-ulke-secimi.html` redirect to the new pages.

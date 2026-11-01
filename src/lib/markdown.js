import { marked } from 'marked';
import { flags } from '../content/flags.js';

marked.setOptions({ gfm: true });

// Reads the "key: value" block between the two --- lines at the top of a .md file
export function parseFrontmatter(raw) {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  m[1].split('\n').forEach((line) => {
    const i = line.indexOf(':');
    if (i < 0) return;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    else if (/^-?\d+(\.\d+)?$/.test(val)) val = Number(val);
    data[key] = val;
  });
  return { data, body: m[2] };
}

export const inline = (s) => marked.parseInline(String(s ?? ''));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const slugify = (s) =>
  s.toLocaleLowerCase('tr')
    .replace(/[çğıöşü]/g, (c) => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' })[c])
    .replace(/<[^>]+>|[*_`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const plain = (s) => s.replace(/[*_`]/g, '');

// :::type arguments
// content
// :::
function container(type, arg, inner) {
  switch (type) {
    case 'callout':
    case 'callout-dark':
      return `<aside class="callout${type === 'callout-dark' ? ' callout--dark' : ''}"><span class="callout-title">${esc(arg)}</span>${inline(inner)}</aside>`;
    case 'country': {
      const [code, ...name] = arg.split(/\s+/);
      return `<div class="country"><span class="flag">${flags[code] || ''}</span><div><h3>${esc(name.join(' '))}</h3><p>${inline(inner)}</p></div></div>`;
    }
    case 'profile': {
      const [title, rec = ''] = arg.split('|').map((s) => s.trim());
      return `<div class="profile"><h3>${esc(title)}</h3><span class="rec">${esc(rec)}</span><p>${inline(inner)}</p></div>`;
    }
    case 'table-note':
      return `<p class="table-note">${inline(inner)}</p>`;
    case 'disclaimer':
      return `<p class="disclaimer">${inline(inner)}</p>`;
    default:
      return marked.parse(inner);
  }
}

// Turns a guide / page body into HTML. With numbered: true, every "## " heading
// gets 01, 02, 03… and is collected into the table of contents.
export function renderMarkdown(body, { numbered = false } = {}) {
  const toc = [];
  let n = 0;
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const c = line.match(/^:::([\w-]+)\s*(.*)$/);
    if (c) {
      const inner = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
      out.push('', container(c[1], c[2].trim(), inner.join('\n').trim()), '');
      continue;
    }
    const h = line.match(/^##\s+(.+?)(?:\s*\{#([\w-]+)\})?\s*$/);
    if (h) {
      const id = h[2] || slugify(h[1]);
      if (numbered) {
        n++;
        toc.push({ id, text: plain(h[1]) });
        out.push('', `<h2 id="${id}"><span class="n">${String(n).padStart(2, '0')}</span>${inline(h[1])}</h2>`, '');
      } else {
        out.push('', `<h2${h[2] ? ` id="${id}"` : ''}>${inline(h[1])}</h2>`, '');
      }
      continue;
    }
    out.push(line);
  }
  let html = marked.parse(out.join('\n'));
  html = html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>')
    // rows whose first cell contains "toplam" are shown as total rows
    .replace(/<tr>(\s*<td[^>]*>)([\s\S]*?)(<\/td>)/g, (m, a, b, c2) =>
      /toplam/i.test(b.replace(/<[^>]+>/g, '')) ? `<tr class="total">${a}${b}${c2}` : m)
    // numbered list items get an inner <span> (needed for the number layout)
    .replace(/<ol>[\s\S]*?<\/ol>/g, (ol) => ol.replace(/<li>/g, '<li><span>').replace(/<\/li>/g, '</span></li>'));
  return { html, toc };
}

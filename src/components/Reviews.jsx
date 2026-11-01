import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pin } from './Icons.jsx';

const CLAMP_FROM = 260; // characters

function ReviewCard({ review }) {
  const long = review.text.trim().length >= CLAMP_FROM;
  const [open, setOpen] = useState(false);
  return (
    <article className="t-card">
      <span className="t-place"><Pin bold />{review.place}</span>
      <div className="t-quote" aria-hidden="true">“</div>
      <p className={'t-text' + (long && !open ? ' clamped' : '')}>{review.text}</p>
      {long && (
        <button className="t-more" type="button" onClick={() => setOpen((o) => !o)}>
          {open ? 'Daha az göster' : 'Devamını oku'}
        </button>
      )}
      <div className="t-author"><div className="t-name">{review.name}</div><div className="t-meta">{review.detail}</div></div>
    </article>
  );
}

export default function Reviews({ items }) {
  const sc = useRef(null);
  const [active, setActive] = useState(0);

  const cards = () => Array.from(sc.current ? sc.current.querySelectorAll('.t-card') : []);

  const current = useCallback(() => {
    const el = sc.current;
    if (!el) return 0;
    const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    let best = 0;
    let bd = Infinity;
    cards().forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft - pl);
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  }, []);

  const go = (i) => {
    const list = cards();
    if (!list.length) return;
    i = Math.max(0, Math.min(list.length - 1, i));
    sc.current.scrollTo({ left: list[i].offsetLeft - list[0].offsetLeft, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = sc.current;
    if (!el) return;
    const sync = () => window.requestAnimationFrame(() => setActive(current()));
    el.addEventListener('scroll', sync, { passive: true });
    sync();
    return () => el.removeEventListener('scroll', sync);
  }, [current]);

  return (
    <>
      <div className="t-scroller" tabIndex={0} aria-label="Yorumlar" ref={sc}>
        {items.map((r, i) => <ReviewCard key={i} review={r} />)}
      </div>
      <div className="t-controls">
        <div className="t-dots">
          {items.map((_, i) => (
            <button key={i} className={'t-dot' + (i === active ? ' active' : '')} type="button" aria-label={`${i + 1}. yorum`} onClick={() => go(i)} />
          ))}
        </div>
        <div className="t-arrows">
          <button className="t-btn t-prev" type="button" aria-label="Önceki yorum" onClick={() => go(current() - 1)}><ArrowLeft /></button>
          <button className="t-btn t-next" type="button" aria-label="Sonraki yorum" onClick={() => go(current() + 1)}><ArrowRight /></button>
        </div>
      </div>
    </>
  );
}

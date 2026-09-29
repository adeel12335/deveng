'use client';

import { useEffect, useRef, useState } from 'react';
import { quotes } from '@/lib/site';
import { ChevronLeft, ChevronRight } from './icons';
import Reveal from '@/components/Reveal';

/** A stacked list on wide screens; a swipeable one-up carousel under 640px. */
export default function QuoteCarousel() {
  const [index, setIndex] = useState(0);
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.innerWidth > 640) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: el.clientWidth * index, behavior: reduced ? 'auto' : 'smooth' });
  }, [index]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 640) setIndex(0); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <Reveal className="mock-quotes" direction="up">
      <div className="mock-quote-track" ref={track}>
        {quotes.map((q) => (
          <blockquote key={q}><span>&ldquo;</span><p>{q}</p></blockquote>
        ))}
      </div>
      <div className="mock-quote-controls" aria-label="Author quote controls">
        <button type="button" aria-label="Previous quote" onClick={() => setIndex((i) => (i - 1 + quotes.length) % quotes.length)}>
          <ChevronLeft />
        </button>
        <span>{index + 1} / {quotes.length}</span>
        <button type="button" aria-label="Next quote" onClick={() => setIndex((i) => (i + 1) % quotes.length)}>
          <ChevronRight />
        </button>
      </div>
    </Reveal>
  );
}

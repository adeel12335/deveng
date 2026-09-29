'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { books } from '@/lib/site';
import { ChevronLeft, ChevronRight } from './icons';
import Reveal from '@/components/Reveal';

/** Scroll-snap carousel below 900px; a plain five-up grid above it. */
export default function BookShelf() {
  const track = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync, { passive: true });
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const nudge = (dir) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(230, Math.round(el.clientWidth * 0.68)), behavior: 'smooth' });
  };

  // The 3D tilt follows the pointer, but only on a real hover-capable device.
  const onMove = (e) => {
    const card = e.currentTarget;
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--book-ry', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
    card.style.setProperty('--book-rx', `${-2 - ((e.clientY - r.top) / r.height - 0.5) * 5}deg`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.removeProperty('--book-ry');
    e.currentTarget.style.removeProperty('--book-rx');
  };

  return (
    <Reveal className="mock-book-wrap" direction="right">
      <button className="mock-carousel-btn prev" aria-label="Previous books" disabled={atStart} onClick={() => nudge(-1)}>
        <ChevronLeft />
      </button>
      <div className="mock-book-grid" ref={track} onScroll={sync}>
        {books.map((book) => (
          <article key={book.slug} onPointerMove={onMove} onPointerLeave={onLeave}>
            <Link href={`/books/${book.slug}`}>
              <span className="mock-book-cover">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  sizes="(max-width: 700px) 44vw, (max-width: 1080px) 150px, 190px"
                />
              </span>
            </Link>
            <h3><Link href={`/books/${book.slug}`}>{book.shelfTitle ?? book.title}</Link></h3>
          </article>
        ))}
      </div>
      <button className="mock-carousel-btn next" aria-label="Next books" disabled={atEnd} onClick={() => nudge(1)}>
        <ChevronRight />
      </button>
    </Reveal>
  );
}

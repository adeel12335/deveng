'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Cross-page effects the stylesheet depends on: the `js`/`page-ready` classes,
 * scroll-reveal, and the floating action buttons. Re-runs on navigation so
 * newly mounted sections are observed too.
 */
export default function SiteEffects() {
  const pathname = usePathname();
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('js');
    requestAnimationFrame(() => document.body.classList.add('page-ready'));
  }, []);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.reveal:not(.is-visible)');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowActions(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`mock-floating-actions${showActions ? ' is-visible' : ''}`}>
      <a href="#top" aria-label="Back to top">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 12 6-6 6 6M10 6v10" /></svg>
      </a>
      <a href="mailto:bamadei@gmail.com" aria-label="Email Bernard Amadei">
        <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="5" width="14" height="10" rx="1" /><path d="m4 6 6 5 6-5" /></svg>
      </a>
    </div>
  );
}

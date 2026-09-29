'use client';

import { useEffect, useState } from 'react';

/**
 * The floating back-to-top and email buttons, shown once the visitor has
 * scrolled a little way down.
 *
 * Scroll-reveal used to live here too, reaching into the document for
 * `.reveal` elements; each one now observes itself via <Reveal>.
 */
export default function SiteEffects() {
  const [showActions, setShowActions] = useState(false);

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

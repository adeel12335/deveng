'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * A slim progress bar across the top during client-side navigation.
 *
 * The App Router has no router-events API, so this starts on a click of an
 * internal link and finishes when the pathname actually changes. Pages are
 * statically exported, so most navigations finish almost immediately — the
 * bar only becomes visible when the route chunk takes a moment to arrive,
 * which is exactly when the visitor needs the feedback.
 *
 * The creep to ~90% is a CSS animation rather than a chain of timers, so
 * there is no mutable state to juggle across renders.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState('idle'); // idle | loading | done
  const [lastPath, setLastPath] = useState(pathname);

  // The route changed, so the new page is on screen: run the bar out.
  // Adjusting during render rather than in an effect avoids a second pass.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (phase === 'loading') setPhase('done');
  }

  useEffect(() => {
    const onClick = (event) => {
      // No defaultPrevented check: next/link cancels the event itself to take
      // over navigation, so bailing on it would mean never firing at all.
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest?.('a');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      setPhase('loading');
    };

    // Capture phase, so this runs before next/link handles the click.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Back to idle once the bar has run out. A timer rather than transitionend:
  // swapping the creep animation for a transition in the same frame means the
  // browser may jump straight to the end value and never fire the event.
  useEffect(() => {
    if (phase !== 'done') return undefined;
    const id = setTimeout(() => setPhase('idle'), 450);
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <div
      className={`route-progress is-${phase}`}
      role="progressbar"
      aria-hidden={phase === 'idle'}
      aria-label="Loading page"
    >
      <span />
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades its element in as it scrolls into view.
 *
 * Each instance observes its own node, so nothing goes hunting through the
 * document for `.reveal` elements. It renders visible on the server, which
 * means the statically exported HTML reads fine with JavaScript disabled.
 *
 * Whether to animate is decided by the observer's first callback rather than
 * by measuring at mount: at mount the images above have not been laid out yet,
 * so everything measures as on-screen and nothing would ever animate. Anything
 * genuinely in view stays visible and is never hidden, so it cannot flash.
 */
export default function Reveal({
  as: Tag = 'div',
  direction,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return undefined;
    }

    let settled = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHidden(false);
            io.disconnect();
            return;
          }
          // Off screen on the first look: arm the animation for when it arrives.
          if (!settled) setHidden(true);
        });
        settled = true;
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = [
    className,
    'reveal',
    direction ? `reveal-${direction}` : '',
    hidden ? '' : 'is-visible',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}

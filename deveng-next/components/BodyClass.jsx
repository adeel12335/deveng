'use client';

import { useEffect } from 'react';

/**
 * Adds a class to <body> for the life of the page that renders it.
 *
 * The homepage needs `home-mockup` on the body itself: around 27 of the
 * home stylesheet's rules restyle the shared header, footer and floating
 * actions, and those live in the root layout rather than inside the page.
 *
 * The App Router alternative is a second root layout under a route group,
 * which can set its own <body className>. That was not worth it here —
 * moving between root layouts forces a full document reload, so the site
 * would lose client-side navigation between the homepage and everything
 * else in exchange for avoiding this one effect.
 */
export default function BodyClass({ name }) {
  useEffect(() => {
    document.body.classList.add(name);
    return () => document.body.classList.remove(name);
  }, [name]);
  return null;
}

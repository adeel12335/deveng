'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Magnifier } from './icons';

const MIN_QUERY = 2;
const DEBOUNCE_MS = 180;
const MAX_RESULTS = 6;

/**
 * Search over the built site, powered by Pagefind.
 *
 * The index is generated from out/ after `next build` (see the postbuild
 * script), so it does not exist while running `next dev` — the panel says so
 * rather than failing silently.
 */
export default function SiteSearch({ open, inputRef }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | searching | ready | unavailable
  const engine = useRef(null);

  const term = query.trim();
  const active = term.length >= MIN_QUERY;

  /** Resolves to the Pagefind module, or `false` when no index is present. */
  const load = useCallback(async () => {
    if (engine.current !== null) return engine.current;
    try {
      // Built by Pagefind into out/pagefind/. The path is assembled at runtime
      // so the bundler does not try to resolve it at build time.
      const path = ['', 'pagefind', 'pagefind.js'].join('/');
      const mod = await import(/* webpackIgnore: true */ path);
      await mod.init?.();
      engine.current = mod;
    } catch {
      engine.current = false;
    }
    return engine.current;
  }, []);

  // Warm the index while the visitor is still typing their first character.
  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  useEffect(() => {
    if (!active) return undefined;

    let cancelled = false;
    const id = setTimeout(async () => {
      const mod = await load();
      if (cancelled) return;
      if (!mod) {
        setStatus('unavailable');
        return;
      }
      setStatus('searching');
      const search = await mod.search(term);
      const data = await Promise.all(search.results.slice(0, MAX_RESULTS).map((r) => r.data()));
      if (cancelled) return;
      setResults(data);
      setStatus('ready');
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [term, active, load]);

  // What renders is derived from the current query, so results left over from a
  // previous term are never shown and no effect has to clear them.
  const shown = active && status === 'ready' ? results : [];
  let message = null;
  if (active && status === 'unavailable') {
    message = 'Search runs on the built site — try it after a production build.';
  } else if (active && status === 'ready' && results.length === 0) {
    message = `No results for “${term}”.`;
  }

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="site-search-row">
        <label htmlFor="site-search-input">Search DevEng.org</label>
        <div className="site-search-field">
          <input
            id="site-search-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your search&hellip;"
            autoComplete="off"
            aria-describedby="site-search-status"
          />
          <button type="submit" aria-label="Submit search"><Magnifier /></button>
        </div>
      </div>

      <div className="site-search-results" id="site-search-status" aria-live="polite">
        {message && <p className="site-search-note">{message}</p>}
        {shown.map((r) => (
          <Link className="site-search-hit" key={r.url} href={r.url}>
            <strong>{r.meta?.title || r.url}</strong>
            <span dangerouslySetInnerHTML={{ __html: r.excerpt }} />
          </Link>
        ))}
      </div>
    </form>
  );
}

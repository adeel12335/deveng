'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { nav, site } from '@/lib/site';
import SiteSearch from './SiteSearch';
import { Chevron, Magnifier } from './icons';

/** Routes are exported with a trailing slash, so compare without one. */
const normalize = (p) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p);

/** True when `href` is the current page, or its section contains it. */
function isCurrent(pathname, item) {
  const here = normalize(pathname);
  if (item.href === '/') return here === '/';
  if (here === item.href) return true;
  return Boolean(item.children) && here.startsWith(item.href + '/');
}

function HeaderContent({ pathname }) {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const searchInput = useRef(null);
  const mobileSearchInput = useRef(null);

  // The stylesheet keys the open states off body classes, as the static build did.
  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
    return () => document.body.classList.remove('nav-open');
  }, [navOpen]);

  useEffect(() => {
    document.body.classList.toggle('search-open', searchOpen);
    if (searchOpen) requestAnimationFrame(() => searchInput.current?.focus());
    return () => document.body.classList.remove('search-open');
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) { setNavOpen(false); setOpenSubmenu(null); } };
    const onKey = (e) => { if (e.key === 'Escape') { setNavOpen(false); setSearchOpen(false); setOpenSubmenu(null); } };
    const onClick = (e) => {
      if (!e.target.closest('[data-search-panel]') && !e.target.closest('[data-search-toggle]')) setSearchOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} data-site-header>
      <button
        className="nav-scrim"
        type="button"
        aria-label="Close navigation"
        tabIndex={navOpen ? 0 : -1}
        onClick={() => setNavOpen(false)}
      />
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label={`${site.name} home`}>
          <Image src="/assets/images/deveng-logo-clean.png" alt={site.name} width={210} height={102} priority />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="primary-navigation"
          onClick={() => {
            setSearchOpen(false);
            setNavOpen((value) => !value);
            setOpenSubmenu('/books');
          }}
        >
          <span /><span /><span />
          <span className="screen-reader-text">Toggle navigation</span>
        </button>

        <nav className="primary-nav" id="primary-navigation" aria-label="Primary navigation">
          <div className="mobile-nav-head">
            <div className="mobile-nav-search">
              <SiteSearch open={navOpen} inputRef={mobileSearchInput} idPrefix="mobile-nav-search" />
            </div>
            <button className="mobile-nav-close" type="button" aria-label="Close navigation" onClick={() => setNavOpen(false)}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
          <ul className="site-menu">
            {nav.map((item) => {
              const current = isCurrent(pathname, item);
              const open = openSubmenu === item.href;
              if (!item.children) {
                return (
                  <li key={item.href} className={current ? 'current-menu-item' : undefined}>
                    <Link href={item.href} aria-current={normalize(pathname) === item.href ? 'page' : undefined} onClick={() => setNavOpen(false)}>{item.label}</Link>
                  </li>
                );
              }
              return (
                <li key={item.href} className={`has-submenu${current ? ' current-menu-item' : ''}${open ? ' is-open' : ''}`}>
                  <div className="menu-parent-row">
                    <Link href={item.href} aria-current={normalize(pathname) === item.href ? 'page' : undefined} onClick={() => setNavOpen(false)}>{item.label}</Link>
                    <button
                      className="submenu-toggle"
                      type="button"
                      aria-expanded={open}
                      aria-label={`Show ${item.label} submenu`}
                      onClick={(e) => { e.stopPropagation(); setOpenSubmenu(open ? null : item.href); }}
                    >
                      <Chevron />
                    </button>
                  </div>
                  <ul className="sub-menu">
                    {item.children.map((child) => (
                      <li key={child.href}>
                    <Link href={child.href} aria-current={normalize(pathname) === child.href ? 'page' : undefined} onClick={() => setNavOpen(false)}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
            <li className="menu-search-item">
              <button
                className="menu-search-toggle"
                type="button"
                aria-label={`Search ${site.name}`}
                aria-expanded={searchOpen}
                aria-controls="site-search"
                data-search-toggle
                onClick={() => { setNavOpen(false); setSearchOpen((v) => !v); }}
              >
                <Magnifier />
              </button>
            </li>
          </ul>
        </nav>

        <div className="site-search-panel" id="site-search" aria-hidden={!searchOpen} data-search-panel>
          <SiteSearch open={searchOpen} inputRef={searchInput} idPrefix="desktop-site-search" />
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  const pathname = usePathname();
  return <HeaderContent key={pathname} pathname={pathname} />;
}

import { books, posts } from '@/lib/site';

const BASE = 'https://www.deveng.org';

// Generated from the same data the pages render, so it cannot drift.
export const dynamic = 'force-static';

export default function sitemap() {
  const routes = [
    '/',
    '/author',
    '/books',
    '/common-ground-solutions-center',
    ...books.map((b) => `/books/${b.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  // Pages are exported with a trailing slash; the sitemap must match or every
  // crawled URL costs a redirect hop.
  return routes.map((route) => ({
    url: route === '/' ? `${BASE}/` : `${BASE}${route}/`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}

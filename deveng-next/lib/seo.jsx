import { site } from './site';

export const SITE_URL = 'https://www.deveng.org';

/**
 * Builds a page's metadata with a canonical URL.
 *
 * Every page needs one: without it, the same content reachable over www and
 * bare, http and https, or with and without the trailing slash looks like
 * several pages to a crawler. Routes are exported with a trailing slash, so
 * the canonical carries one too.
 */
export function pageMetadata({ path = '/', title, description, image, type = 'website' }) {
  const canonical = path === '/' ? '/' : `/${path.replace(/^\/|\/$/g, '')}/`;
  const ogImage = image || '/assets/images/hero-development-engineering-v2.png';

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      type,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Trim to a length search results will actually show, without cutting a word. */
export function clamp(text, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** Site-wide graph: the organisation, the site itself, and Bernard. */
export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: site.name,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/assets/images/deveng-logo-clean.png`,
        email: site.email,
        telephone: site.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address[2],
          addressLocality: 'Lafayette',
          addressRegion: 'CO',
          postalCode: '80026',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: site.name,
        description: site.tagline,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#bernard-amadei`,
        name: 'Bernard Amadei',
        url: `${SITE_URL}/author/`,
        jobTitle: 'Distinguished Professor Emeritus of Civil Engineering',
        affiliation: { '@type': 'Organization', name: 'University of Colorado Boulder' },
      },
    ],
  };
}

export function profileJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${SITE_URL}/author/`,
    mainEntity: { '@id': `${SITE_URL}/#bernard-amadei` },
  };
}

/** The books index as a list, so the set can surface together in results. */
export function bookListJsonLd(books) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: `${SITE_URL}/books/`,
    numberOfItems: books.length,
    itemListElement: books.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/books/${b.slug}/`,
      name: b.title,
    })),
  };
}

export function bookJsonLd(book) {
  const [publisher, year] = (book.meta[1] || '').split('•').map((s) => s.trim());
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    url: `${SITE_URL}/books/${book.slug}/`,
    image: `${SITE_URL}${book.cover}`,
    description: book.blurb,
    author: { '@id': `${SITE_URL}/#bernard-amadei` },
    ...(publisher ? { publisher: { '@type': 'Organization', name: publisher } } : {}),
    ...(year ? { datePublished: year } : {}),
  };
}

export function articleJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    url: `${SITE_URL}/blog/${post.slug}/`,
    datePublished: new Date(post.date).toISOString().slice(0, 10),
    author: { '@id': `${SITE_URL}/#bernard-amadei` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    description: clamp(post.body[0]),
  };
}

/** Renders a JSON-LD block. Next keeps this out of the React tree's text. */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

# DevEng.org — Next.js

Next.js (App Router) version of the DevEng.org site. It renders the same design
as the static build in the parent folder, but header, footer, navigation, books
and posts are defined once instead of being copied into every page.

## Run

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Build

```bash
npm run build
```

`output: 'export'` is set, so the build writes plain static HTML to `out/`.
Upload that folder to any host — Apache, Nginx, Hostinger, Netlify, Cloudflare
Pages, GitHub Pages. There is no Node runtime in production.

## Layout

```
app/
  layout.jsx                  Header + Footer + global CSS, wraps every route
  page.jsx                    Homepage
  author/                     /author
  books/                      /books
  books/[slug]/               One template renders all five book pages
  blog/<slug>/                The four posts
  not-found.jsx               404
  sitemap.js, robots.js       Generated from lib/site.js
  globals.css                 Shared stylesheet (was assets/css/style.css)
  home.css                    Homepage-only rules (was assets/css/home-mockup.css)
components/
  Header.jsx                  Nav, dropdown, search, current-page state
  Footer.jsx
  HeroSlider.jsx              Autoplay, dots, arrows, swipe, parallax
  BookShelf.jsx               Five-up grid / carousel with pointer tilt
  QuoteCarousel.jsx
  Principles.jsx              The five Ps
  ContactSection.jsx          Homepage and inner-page bands
  ContactForm.jsx             mailto: hand-off, or POST to an endpoint
  SiteEffects.jsx             Scroll reveal, floating actions
lib/
  site.js                     Nav, books, posts, quotes, contact details
```

## Adding a book

Add one entry to `books` in `lib/site.js`. It appears on the homepage shelf, the
books index, the header dropdown and the sitemap, and gets its own page at
`/books/<slug>` — no other file changes.

## Search

Search is built by [Pagefind](https://pagefind.app), which indexes `out/` after
`next build` (the `postbuild` script). It is a static index — no server, no API
key. Only `<main>` is indexed (`data-pagefind-body` in `app/layout.jsx`), so
excerpts show page content rather than the navigation.

The index does not exist while running `next dev`, so the panel says so instead
of failing. To try search locally:

```bash
npm run build
npx serve out
```

## Contact form

With no backend the form opens the visitor's mail client, as the static build
did. To post to a form provider instead, pass an endpoint:

```jsx
<ContactForm endpoint="https://example.com/f/abc123" />
```

## URLs

Routes are clean paths rather than `.html` files, and `trailingSlash: true` is
set, so pages are served as `/author/`, `/books/water-energy-land-food-nexus/`
and so on. The old static build used `/author.html`. If the `.html` URLs are
already published anywhere, add redirects at the host.

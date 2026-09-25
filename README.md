# DevEng.org — Static HTML Production Build

Standalone responsive HTML/CSS/JS version of the approved DevEng.org redesign. No WordPress runtime is required.

## Run locally

```bash
python -m http.server 8080
```
Then open `http://localhost:8080`.

## Deploy
Upload the full contents of this folder to the web root of any static host (Apache, Nginx, Hostinger, Netlify, Cloudflare Pages, GitHub Pages, etc.). Keep the `assets/` directory paths unchanged.

## Contact form
The form works without a backend by opening the visitor's email client with a pre-filled message to `bamadei@gmail.com`. For server-side submissions, set a form endpoint in the `data-endpoint` attribute and the form `action`/`method` as required by your provider or backend.

## Assets
The DevEng logo, hero image, community project image, bridge image, Bernard Amadei portrait and WELF book cover are bundled locally in `assets/images/`. A few official book-cover images are referenced from the existing DevEng.org WordPress media library so the redesign continues to use the current source artwork rather than replacing it. If the old WordPress media library will be removed, download those covers into `assets/images/` and replace the URLs in `index.html`, `books.html`, and the matching book pages.

## Main files
- `index.html` — homepage
- `author.html` — author page
- `books.html` — books overview
- `common-ground-solutions-center.html` — CGSC page
- `book-*.html` — individual book pages
- blog HTML pages for the four existing footer posts
- `404.html`, `robots.txt`, `sitemap.xml`
- `assets/css/style.css`
- `assets/js/main.js`

## Production notes
- Fully responsive mobile navigation
- Accessible skip link, keyboard-friendly navigation and reduced-motion support
- Lazy-loaded images
- SEO title/description and Open Graph metadata
- No external CSS/JS framework dependency

## V2 mockup-matched homepage
The homepage (`index.html`) was rebuilt against the approved desktop and mobile mockups. Its layout-specific rules are in `assets/css/home-mockup.css`. All homepage book-cover assets are local under `assets/images/books/` so the homepage does not rely on remote book artwork.

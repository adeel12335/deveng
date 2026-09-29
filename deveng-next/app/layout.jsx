import { Inter } from 'next/font/google';
import './globals.css';
import './home.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteEffects from '@/components/SiteEffects';
import RouteProgress from '@/components/RouteProgress';

export const metadata = {
  metadataBase: new URL('https://www.deveng.org'),
  title: {
    default: 'Development Engineering | DevEng.org',
    template: '%s | Development Engineering',
  },
  description:
    'Using engineering knowledge and tools to work with people to build a more just, sustainable and peaceful world.',
  openGraph: {
    siteName: 'DevEng.org',
    type: 'website',
    images: ['/assets/images/hero-development-engineering-v2.png'],
  },
};

export const viewport = { width: 'device-width', initialScale: 1 };

const CRITICAL_CSS = `
html{overflow-x:clip}
body{margin:0}
img,svg{max-width:100%}
.mock-hero-stage,.mock-hero-visual,.hero-slide,.mock-book-cover,
.hero-thumbnail-image,.mock-author-photo,.mock-photo-card,.mock-bridge,
.book-list-cover,.book-detail-cover{position:relative;overflow:hidden}
.mock-hero-visual,.hero-slide{position:absolute;inset:0}
.mock-hero-stage{height:620px}
.mock-book-cover{aspect-ratio:1/1.42}
.book-list-cover{aspect-ratio:2/3}
.hero-thumbnail-image{aspect-ratio:1.75/1}

/* Covers the page until the stylesheet has applied. Without it the first
   paint can land before the CSS does, and next/image fill images size against
   the viewport instead of their container -- a book cover filling the screen
   and the header shoved off the side. Inline, so it is never the late one. */
#boot{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;
  justify-content:center;background:#fff;transition:opacity .35s ease}
#boot[hidden]{display:none}
#boot.done{opacity:0;pointer-events:none}
#boot i{width:34px;height:34px;border-radius:50%;border:2px solid rgba(20,122,73,.18);
  border-top-color:#147a49;animation:boot-spin .7s linear infinite}
@keyframes boot-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){#boot i{animation-duration:2s}}
`;

// Runs before the body paints. Waits for the stylesheet to actually be in
// effect -- verified by a sentinel custom property the main CSS sets -- then
// fades the cover out. The timeout means a CSS failure can never leave the
// page hidden.
const BOOT_SCRIPT = `
(function(){
  var el=document.getElementById('boot');
  if(!el)return;
  var done=function(){
    if(el.dataset.done)return;
    el.dataset.done='1';
    el.className='done';
    setTimeout(function(){el.hidden=true},400);
  };
  var ready=function(){
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--css-ready').trim()==='1';
  };
  var tries=0;
  (function poll(){
    if(ready()||++tries>120)return done();
    requestAnimationFrame(poll);
  })();
  window.addEventListener('load',done);
  setTimeout(done,4000);
})();
`;

// The stylesheet asked for Inter but nothing ever loaded it, so anyone without
// Inter installed silently got system-ui. next/font self-hosts it at build time
// and exposes it as the --font-sans variable the stylesheet now uses.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          next/image `fill` images are position:absolute with height:100%, so
          they size against the nearest positioned ancestor. Those ancestors
          get their position and aspect-ratio from the external stylesheet —
          and in the moment before it applies, the images resolve against the
          viewport instead and blow up to full screen, pushing the header off
          the side. Shipping just those containment rules inside the document
          means there is no such moment.
        */}
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
      </head>
      <body id="top">
        <div id="boot" aria-hidden="true"><i /></div>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <RouteProgress />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content" data-pagefind-body>{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}

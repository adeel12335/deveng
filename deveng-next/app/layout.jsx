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
      <body id="top">
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

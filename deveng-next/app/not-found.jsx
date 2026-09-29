import Link from 'next/link';

export const metadata = {
  title: { absolute: 'Page not found | Development Engineering' },
  description: 'The page you were looking for could not be found.',
  // A 404 should never compete in the index.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section error-page">
      <div className="shell center narrow">
        <p className="error-code">404</p>
        <h1>This page could not be found</h1>
        <span className="accent-line center-rule" />
        <p className="page-lead" style={{ marginInline: 'auto' }}>
          The link may be out of date, or the page may have moved. Try the books, the author page, or
          head back to the homepage.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link className="button button-orange" href="/">Back to Home</Link>
          <Link className="button button-outline" href="/books">Browse the books</Link>
        </div>
      </div>
    </section>
  );
}

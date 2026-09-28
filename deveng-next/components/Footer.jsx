import Link from 'next/link';
import Image from 'next/image';
import { posts, quickLinks, site, socials } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand footer-logo" href="/">
            <Image src="/assets/images/deveng-logo-clean.png" alt={site.name} width={210} height={102} />
          </Link>
          <p className="footer-tagline">{site.tagline}</p>
          <nav className="footer-socials" aria-label="Social links">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {s.paths.map((d) => (
                    <path key={d} d={d} fill={s.stroke ? 'none' : 'currentColor'} stroke={s.stroke ? 'currentColor' : 'none'} />
                  ))}
                </svg>
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="footer-title">Contact</h2>
          <address className="footer-contact">
            <strong>{site.address[0]}</strong><br />
            {site.address.slice(1).map((line) => (<span key={line}>{line}<br /></span>))}
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a><br />
            <a href={`mailto:${site.email}`}>{site.email}</a><br />
            <a href={site.website}>deveng.org</a>
          </address>
        </div>

        <div>
          <h2 className="footer-title">Quick links</h2>
          <ul className="footer-links">
            {quickLinks.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Fresh from blog</h2>
          <div className="footer-posts">
            {posts.map((p) => (
              <Link className="footer-post" key={p.slug} href={`/blog/${p.slug}`}>
                <span>{p.title}</span>
                <small>{p.date}</small>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>&copy; 2026 {site.name}. All rights reserved.</span>
        <Link href="/">deveng.org</Link>
      </div>
    </footer>
  );
}

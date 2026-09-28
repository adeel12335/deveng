import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ContactSection from '@/components/ContactSection';
import { books } from '@/lib/site';

// One template renders all five book pages; the static build had five files.
export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) return {};
  return { title: { absolute: book.metaTitle }, description: book.body[0] };
}

export default async function BookPage({ params }) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  return (
    <>
      <section className="inner-hero compact">
        <div className="shell">
          <Link className="hero-back-link" href="/books">← All books</Link>
          <h1>{book.title}</h1>
          <span className="accent-line" />
          <p className="hero-subcopy">{book.subtitle}</p>
        </div>
      </section>

      <section className="section inner-content">
        <div className="shell book-detail-grid">
          <aside className="book-detail-cover">
            <Image src={book.cover} alt={book.title} width={258} height={396} priority sizes="(max-width: 800px) 260px, 300px" />
          </aside>
          <article className="prose">
            <div className="book-meta">
              {book.meta.map((pill) => (<span className="meta-pill" key={pill}>{pill}</span>))}
            </div>
            <h2>Description</h2>
            {book.body.map((para) => (<p key={para}>{para}</p>))}
            <p><Link className="button button-green" href="/books">Back to All Books</Link></p>
          </article>
        </div>
      </section>

      <ContactSection variant="inner" />
    </>
  );
}

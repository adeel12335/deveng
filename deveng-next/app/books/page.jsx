import Link from 'next/link';
import Image from 'next/image';
import ContactSection from '@/components/ContactSection';
import { books } from '@/lib/site';

export const metadata = {
  title: { absolute: 'Books by Bernard Amadei | Development Engineering' },
  description:
    'Books exploring engineering for human development, systems thinking, resource nexuses, sustainability, climate security, peace and diplomacy.',
};

export default function BooksPage() {
  return (
    <>
      <section className="inner-hero compact">
        <div className="shell">
          <h1>Books by Bernard Amadei</h1>
          <span className="accent-line" />
          <p className="hero-subcopy">
            Books exploring engineering for human development, systems thinking, resource nexuses,
            sustainability, climate security, peace and diplomacy.
          </p>
        </div>
      </section>

      <section className="section inner-content">
        <div className="shell">
          <div className="books-grid">
            {books.map((book) => (
              <article className="book-list-card reveal" key={book.slug}>
                <Link className="book-list-cover" href={`/books/${book.slug}`}>
                  <Image src={book.cover} alt={book.title} width={258} height={396} sizes="(max-width: 700px) 108px, 190px" />
                </Link>
                <div className="book-list-copy">
                  <h2><Link href={`/books/${book.slug}`}>{book.title}</Link></h2>
                  <p>{book.blurb}</p>
                  <Link className="text-link arrow-link" href={`/books/${book.slug}`}>View book <span>&rarr;</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection variant="inner" />
    </>
  );
}

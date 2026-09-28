import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ContactSection from '@/components/ContactSection';
import { posts, site } from '@/lib/site';

// One template renders every post; the static build had a file each.
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: { absolute: `${post.title} | Development Engineering` }, description: post.body[0] };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section className="article-hero">
        <div className="shell article-hero-grid">
          <div className="article-heading">
            <Link className="hero-back-link" href="/">← Back to Home</Link>
            <h1>{post.title}</h1>
            <div className="post-meta">{post.date} &bull; {site.name}</div>
          </div>
          <figure className="article-hero-media">
            <Image src="/assets/images/community-project-v2.webp" alt="Community members collaborating on an engineering project" width={1536} height={1024} priority sizes="(max-width: 820px) 100vw, 46vw" />
          </figure>
        </div>
      </section>

      <article className="section inner-content">
        <div className="shell article-shell prose">
          {post.body.map((para) => (<p key={para}>{para}</p>))}
          <p><Link className="text-link arrow-link" href="/">Back to Home <span>→</span></Link></p>
        </div>
      </article>

      <ContactSection variant="inner" />
    </>
  );
}

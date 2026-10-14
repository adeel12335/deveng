import Image from 'next/image';
import ContactSection from '@/components/ContactSection';
import { site } from '@/lib/site';
import { pageMetadata, profileJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/author',
  title: 'Bernard Amadei — The Author',
  description:
    'Bernard Amadei: Distinguished Emeritus Professor at CU Boulder, founding president of Engineers Without Borders-USA, member of the National Academy of Engineering, author and public speaker.',
  image: '/assets/images/bernard-amadei.png',
  type: 'profile',
});

export default function AuthorPage() {
  return (
    <>
      <JsonLd data={profileJsonLd()} />
      <section className="inner-hero author-hero">
        <div className="shell author-hero-grid">
          <div className="inner-hero-copy">
            <h1>Bernard Amadei</h1>
            <span className="accent-line" />
            <p className="hero-subcopy">Civil engineer, educator, systems thinker and founder of Engineers Without Borders–USA.</p>
          </div>
          <figure className="author-hero-media">
            <Image className="author-hero-image" src="/assets/images/bernard-amadei.png" alt="Bernard Amadei speaking" width={568} height={378} priority sizes="(max-width: 820px) 100vw, 48vw" />
          </figure>
        </div>
      </section>

      <section className="section author-story">
        <div className="shell author-story-grid">
          <article className="prose">
            <h2>Biographical Sketch</h2>
            <p>Dr. Amadei is a Distinguished Emeritus Professor of Civil Engineering at the University of Colorado Boulder. He received his Ph.D. in 1982 from the University of California, Berkeley, and is the Founding Director of the Mortenson Center in Engineering for Developing Communities, now Global Engineering.</p>
            <p>He is the founding president of Engineers Without Borders–USA and a co-founder of the Engineers Without Borders International Network. In 2013 and 2014 he served as a Science Envoy to Pakistan and Nepal for the US Department of State. His professional work connects engineering, systems thinking, human development and peacebuilding.</p>
            <p>Dr. Amadei is an elected member of the US National Academy of Engineering and the National Academy of Construction, an elected Senior Ashoka Fellow and an ASEE Hall of Fame inductee. He received the 2026 American Council of Engineering Companies (ACEC) Award of Merit and holds seven honorary doctoral degrees.</p>
            <div className="quote-card"><p>“He has a true passion to serve developing communities and it has been my honor and privilege to work with him on this journey.”</p><cite>Cathy Leslie, Engineers Without Borders-USA</cite></div>
          </article>
          <article className="prose author-summary">
            <h2>Professional Summary</h2>
            <p>Amadei has authored and co-authored books and technical papers and has worked across research, education and consulting. His recent books include <em>Engineering for Peace and Diplomacy</em> (2025), and his new book, <em>Engineering With Soul</em>, will be published in 2026.</p>
            <p>His major interests are development engineering, complexity and system dynamics, geological engineering, and engineering for peace and diplomacy. His current work centres on systems-based methods for planning, designing, implementing, monitoring and evaluating small-scale community development projects.</p>
            <ul className="author-facts" aria-label="Selected distinctions">
              <li>Member, US National Academy of Engineering (2008) and National Academy of Construction (2013)</li>
              <li>Senior Ashoka Fellow; ASEE Hall of Fame inductee (2023)</li>
              <li>Hoover Medal (2007); Heinz Award for the Environment (2007); ASCE OPAL Award (2015)</li>
              <li>ACEC Award of Merit (2026); Jim Swaeby Peace Award, Boulder Rotary Club (2025)</li>
            </ul>
            <div className="button-row">
              <a className="button button-green" href={site.cv} target="_blank" rel="noreferrer">Download the {site.cvLabel}</a>
              <a className="text-link arrow-link" href="https://www.colorado.edu/faculty/amadei/" target="_blank" rel="noreferrer">University Profile <span>→</span></a>
            </div>
          </article>
        </div>
      </section>

      <section className="section speaking-section">
        <div className="shell speaking-grid">
          <div className="speaking-intro"><h2>Public Speaking Topics</h2><span className="accent-line" /><p>Bernard speaks about the role of engineering in addressing complex human and environmental challenges.</p></div>
          <div className="speaking-topics">
            <article><span>01</span><h3>Engineering for Sustainable Human Development</h3><p>Development, poverty reduction, uncertainty, project planning and practical tools for community-focused engineering.</p></article>
            <article><span>02</span><h3>Systems Thinking in Small-Scale Development Projects</h3><p>Understanding interconnected systems, feedback, strengths, weaknesses and relationships in development practice.</p></article>
            <article><span>03</span><h3>Science, Technology and Engineering for Peace</h3><p>How engineering can address root causes of conflict through human development, resource access and peacebuilding.</p></article>
            <article><span>04</span><h3>Engineering for Peace and Diplomacy</h3><p>The role of engineers working across disciplines in conflict-sensitive and fragile environments.</p></article>
          </div>
        </div>
      </section>
      <ContactSection variant="inner" />
    </>
  );
}

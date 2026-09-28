import Image from 'next/image';
import ContactSection from '@/components/ContactSection';

export const metadata = {
  title: { absolute: 'Bernard Amadei — The Author | Development Engineering' },
  description: 'Bernard Amadei, author, changemaker and public speaker.',
};

export default function AuthorPage() {
  return (
    <>
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
            <p>Dr. Amadei is a Distinguished Professor Emeritus of Civil Engineering at the University of Colorado Boulder. He received his Ph.D. from the University of California at Berkeley and founded the Mortenson Center in Engineering for Developing Communities.</p>
            <p>He is the founding president of Engineers Without Borders–USA and co-founder of the Engineers Without Borders-International network. His professional work connects engineering, systems thinking, human development and peacebuilding.</p>
            <div className="quote-card"><p>“He has a true passion to serve developing communities and it has been my honor and privilege to work with him on this journey.”</p><cite>Cathy Leslie, Engineers Without Borders-USA</cite></div>
          </article>
          <article className="prose author-summary">
            <h2>Professional Summary</h2>
            <p>Amadei has authored and co-authored books and technical papers and has worked across research, education and consulting. His current interests include systems-based methods for planning, designing, implementing, monitoring and evaluating small-scale community development projects.</p>
            <a className="text-link arrow-link" href="https://www.colorado.edu/faculty/amadei/" target="_blank" rel="noreferrer">University Profile <span>→</span></a>
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

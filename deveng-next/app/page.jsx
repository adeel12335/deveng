import Link from 'next/link';
import Image from 'next/image';
import BodyClass from '@/components/BodyClass';
import HeroSlider from '@/components/HeroSlider';
import Principles from '@/components/Principles';
import BookShelf from '@/components/BookShelf';
import QuoteCarousel from '@/components/QuoteCarousel';
import ContactSection from '@/components/ContactSection';
import { ArrowRight } from '@/components/icons';

export const metadata = {
  title: { absolute: 'Development Engineering | DevEng.org' },
  description:
    'Using engineering knowledge and tools to work with people to build a more just, sustainable and peaceful world.',
};

export default function HomePage() {
  return (
    <>
      <BodyClass name="home-mockup" />

      <HeroSlider />

      <section className="mock-section mock-what" id="what">
        <div className="mock-shell mock-two-col">
          <div className="mock-copy reveal reveal-left">
            <h2>What is Development Engineering?</h2>
            <span className="mock-rule" />
            <p>
              Development Engineering applies engineering knowledge and tools to work with people to
              create solutions for human development challenges&mdash;especially in low-resource settings.
            </p>
            <a className="mock-btn mock-btn-green" href="#what-more">
              Learn More About Development Engineering <ArrowRight />
            </a>
          </div>
          <figure className="mock-photo-card reveal reveal-right">
            <Image
              src="/assets/images/community-project-v2.webp"
              alt="Community members collaborating on an infrastructure project"
              width={1536}
              height={1024}
              sizes="(max-width: 900px) 100vw, 56vw"
            />
          </figure>
        </div>

        <details className="mock-shell mock-more" id="what-more">
          <summary>Read the full Development Engineering overview</summary>
          <div className="mock-more-body">
            <p>
              Dr. George Bugliarello (2008) describes engineering for development, or development
              engineering, as an interdisciplinary field for engineers who understand development and
              sustainability, bring technical knowledge to those challenges, and collaborate with other
              disciplines, communities and political leaders to design and implement solutions.
            </p>
            <p>
              OpenAI (2023) considers development engineering as &ldquo;a vital field that contributes to
              improving the well-being of communities and advancing sustainable development goals.
              Development engineers apply their engineering expertise to tackle complex challenges and
              create positive impacts on societies around the world.&rdquo;
            </p>
            <p>
              Engineering plays a crucial role in developing technology and creating solutions that lift
              billions of people out of poverty and alleviate their daily struggles. Addressing the needs
              of the 4&ndash;5 billion individuals who fight for survival each day is no longer optional
              for engineers&mdash;it is both a professional and personal responsibility.
            </p>
            <p>
              Meeting twenty-first-century engineering challenges demands more than technical solutions.
              It requires an understanding of the dynamics of socio-technical-psychological systems in
              which physical structures, institutional arrangements, relational networks, and inner human
              processes co-evolve.
            </p>
            <p>
              Development engineering challenges traditional engineering practices that focus on
              value-neutral technical solutions without considering social context. It calls for
              reflective and adaptive thinking, systems thinking, engagement, fieldwork, and collaboration
              with technical and non-technical stakeholders.
            </p>
            <p>
              Ultimately, development engineering humanizes the profession, reinforcing that, at its core,
              engineering is, above all&mdash;and has always been&mdash;about people.
            </p>
          </div>
        </details>
      </section>

      <section className="mock-section mock-why" id="why">
        <div className="mock-shell mock-two-col mock-two-col-reverse">
          <figure className="mock-bridge">
            <Image
              src="/assets/images/bridge-kenya-v2.webp"
              alt="Community bridge in a mountainous landscape"
              width={1672}
              height={941}
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </figure>
          <div className="mock-copy why-copy">
            <h2>Why Development Engineering?</h2>
            <span className="mock-rule" />
            <p>
              Development Engineering can make a critical contribution to global development by advancing
              solutions that are people-centered, environmentally sustainable and practical to implement.
            </p>
          </div>
          <Principles />
        </div>

        <details className="mock-shell mock-more why-more">
          <summary>Read the full Why Development Engineering section</summary>
          <div className="mock-more-body">
            <p>
              <strong>Development engineering brings peace.</strong> Weak states with limited or no
              governance and rule of law, and impoverished communities in a globalized world, are more
              vulnerable to risks. Vulnerable communities do not have the capacity and resilience to adapt
              and cope with crises and adverse events and even less when facing multiple issues such as
              conflict, limited access to resources, and climate-related hazards.
            </p>
            <p>
              <strong>Development engineering brings opportunity and economic prosperity.</strong> Four
              billion people seeking an improved quality of life represent one of the most vibrant growth
              markets in the world. Joint ventures between private and public sectors can unlock
              opportunity across health care, low-cost housing, energy and agriculture. There is a huge
              opportunity for doing well by doing good.
            </p>
            <p>
              <strong>Development engineering is &lsquo;engineering with soul.&rsquo;</strong> It is
              engineering with a human heart&mdash;compassionate practice that brings body, mind and
              spirit into the work. Not only does it create meaningful change, it brings purpose and a
              sense of meaning into our own lives.
            </p>
            <p>
              Development engineering is about the 5Ps of sustainability. It is about navigating the
              complexity across the nexus between people, planet, prosperity, partnerships, and peace.
            </p>
          </div>
        </details>
      </section>

      <section className="mock-section mock-books" id="books">
        <div className="mock-shell">
          <div className="mock-heading-row reveal reveal-left">
            <div>
              <h2>Books by Bernard Amadei</h2>
              <span className="mock-rule" />
            </div>
            <Link className="mock-btn mock-btn-outline" href="/books">
              View All Books <ArrowRight />
            </Link>
          </div>
          <BookShelf />
        </div>
      </section>

      <section className="mock-section mock-author" id="author">
        <div className="mock-shell mock-author-grid">
          <div className="mock-copy reveal reveal-right">
            <h2>Bernard Amadei</h2>
            <span className="mock-rule" />
            <h3>The Author</h3>
            <p>
              Dr. Amadei is a Distinguished Professor Emeritus of Civil Engineering at the University of
              Colorado at Boulder. He is the Founding Director of the Mortenson Center in Engineering for
              Developing Communities, founding president of Engineers Without Borders&ndash;USA, and
              co-founder of the Engineers Without Borders-International network.
            </p>
            <Link className="mock-btn mock-btn-green" href="/author">
              Learn More About Bernard Amadei <ArrowRight />
            </Link>
          </div>
          <figure className="mock-author-photo reveal reveal-left">
            <Image src="/assets/images/bernard-amadei.png" alt="Bernard Amadei speaking" width={568} height={378} sizes="(max-width: 900px) 100vw, 34vw" />
          </figure>
          <QuoteCarousel />
        </div>
      </section>

      <ContactSection variant="home" />
    </>
  );
}

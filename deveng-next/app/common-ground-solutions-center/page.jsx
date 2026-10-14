import Image from 'next/image';
import ContactSection from '@/components/ContactSection';
import Reveal from '@/components/Reveal';
import { cgsc } from '@/lib/cgsc';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/common-ground-solutions-center',
  title: 'Common Ground Solutions Center',
  description:
    'Common Ground Solutions Center, in partnership with Regena Systems Africa: systems thinking, community engineering and infrastructure that is built, measured and maintained across water, sanitation, energy, resource recovery, shelter and food systems.',
});

/** A hairline card grid; the column count comes from the content, not the CSS. */
function Cards({ items, cols = 4, numbered = false }) {
  return (
    <ul className="card-grid" style={{ '--cols': cols }}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title}>
          {numbered ? <span className="card-num">{String(i + 1).padStart(2, '0')}</span> : null}
          {item.code ? <span className="card-num">{item.code}</span> : null}
          {item.tag ? <span className="tag">{item.tag}</span> : null}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          {item.owner ? <span className="owner">{item.owner}</span> : null}
        </Reveal>
      ))}
    </ul>
  );
}

function TitleRow({ kicker, title, children }) {
  return (
    <div className="section-title-row">
      <div>
        {kicker ? <span className="kicker">{kicker}</span> : null}
        <h2>{title}</h2>
        <span className="accent-line" />
      </div>
      {children}
    </div>
  );
}

export default function CommonGroundSolutionsCenterPage() {
  return (
    <>
      <section className="cgsc-hero">
        <div className="shell cgsc-hero-grid">
          <div>
            <span className="kicker">In partnership with {cgsc.partner.name}</span>
            <h1>Common Ground Solutions Center</h1>
            <span className="accent-line" />
            <p className="hero-subcopy">{cgsc.tagline}</p>
          </div>
          <div className="cgsc-hero-statement">
            <strong className="motto">{cgsc.motto}</strong>
            <p className="fivep">{cgsc.fiveP.join(' · ')}</p>
            <ul className="sector-list" aria-label="Sectors we work in">
              {cgsc.sectors.map((s) => (<li key={s}>{s}</li>))}
            </ul>
            <div className="partner-logo">
              <Image src={cgsc.partner.logo} alt="" width={56} height={56} />
              <span>{cgsc.partner.name}<br />{cgsc.partner.where}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell editorial-row">
          <div><span className="kicker">The context</span><h2>{cgsc.context.title}</h2><span className="accent-line" /></div>
          <div>
            <p>{cgsc.context.body}</p>
            <ul className="pressure-list">
              {cgsc.context.pressures.map((p) => (<li key={p}>{p}</li>))}
            </ul>
            <div className="quote-card"><p>&ldquo;{cgsc.context.quote}&rdquo;</p></div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <span className="kicker">Who we are</span>
          <h2>Two complementary organizations. One systems practice.</h2>
        </div>
        <div className="shell mission-grid">
          {cgsc.whoWeAre.map((org) => (
            <article key={org.name}>
              <span>{org.where.split(' · ')[0]}</span>
              <h3>{org.name}</h3>
              <ul>{org.points.map((p) => (<li key={p}>{p}</li>))}</ul>
              {org.logo ? (
                <div className="partner-logo">
                  <Image src={cgsc.partner.logo} alt="" width={56} height={56} />
                  <span>{org.where}</span>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <TitleRow kicker="What we build" title="Community engineering, across the systems a place actually needs.">
            <p>{cgsc.build.intro}</p>
          </TitleRow>
          <Cards items={cgsc.build.items} cols={4} numbered />
        </div>
      </section>

      <section className="cgsc-mission">
        <div className="shell mission-grid">
          <article><span>Mission</span><h2>{cgsc.mission.title}</h2><p>{cgsc.mission.body}</p></article>
          <article><span>Vision</span><h2>{cgsc.vision.title}</h2><p>{cgsc.vision.body}</p></article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <TitleRow kicker="Vision in practice" title="Communities with the capacity to lead">
            <p>Development that is not imposed from outside, but emerges from within: communities able to do five things for themselves.</p>
          </TitleRow>
          <Cards items={cgsc.visionInPractice} cols={5} numbered />
        </div>
      </section>

      <section className="section mist">
        <div className="shell">
          <TitleRow kicker="Our operating principles" title="The 4Rs: what makes a solution succeed.">
            <p>A practical framework for choosing and delivering context-aware development solutions.</p>
          </TitleRow>
          <div className="numbered-cards">
            {cgsc.fourR.map((r) => (
              <article className="numbered-card" key={r.title}><h3>{r.title}</h3><p>{r.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <TitleRow kicker="Solution characteristics" title="What our solutions look like in practice">
            <p>Every project carries the same six commitments, whatever the sector or the scale.</p>
          </TitleRow>
          <Cards items={cgsc.characteristics} cols={3} />
        </div>
      </section>

      <section className="section mist">
        <div className="shell">
          <div className="editorial-row">
            <div><span className="kicker">How solutions get owned</span><h2>{cgsc.ownership.title}</h2><span className="accent-line" /></div>
            <p>{cgsc.ownership.body}</p>
          </div>
          <Cards items={cgsc.ownership.groups} cols={3} />
        </div>
      </section>

      <section className="section cgsc-method">
        <div className="shell editorial-row">
          <div><span className="kicker">How we work</span><h2>{cgsc.nexus.title}</h2><span className="accent-line" /></div>
          <div>
            <ul className="nexus-list">
              {cgsc.nexus.statements.map((s) => (<li key={s.lead}><strong>{s.lead}</strong> {s.rest}</li>))}
            </ul>
            {cgsc.nexus.body.map((p) => (<p key={p}>{p}</p>))}
          </div>
        </div>
      </section>

      <section className="section mist">
        <div className="shell">
          <div className="editorial-row">
            <div><span className="kicker">The deeper why</span><h2>{cgsc.deeperWhy.title}</h2><span className="accent-line" /></div>
            <div>
              <p>{cgsc.deeperWhy.body}</p>
              <p><strong>The 5Ps, integrated.</strong> {cgsc.fiveP.join(', ')}: built into every project, with trade-offs surfaced rather than buried, and grounded in local decision-making and human rights.</p>
            </div>
          </div>
          <Cards items={cgsc.deeperWhy.focus} cols={3} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <TitleRow kicker="Methodology" title="A ten-stage, systems-aware process">
            <p>{cgsc.methodology.intro}</p>
          </TitleRow>
          <ol className="method-list">
            {cgsc.methodology.stages.map((s) => (
              <li key={s.title}><div><h3>{s.title}</h3><p>{s.text}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section mist">
        <div className="shell">
          <TitleRow kicker="Our services" title="Support across the full project lifecycle">
            <p>From ideation to evaluation: practical support from strategic planning through implementation, learning and capacity building.</p>
          </TitleRow>
          <div className="service-rail">
            {cgsc.services.map((s, i) => (
              <article key={s.title}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <ul>{s.items.map((it) => (<li key={it}>{it}</li>))}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <span className="kicker">How we work together</span>
          <h2>{cgsc.motto}</h2>
          <ol className="pipeline">
            {cgsc.pipeline.steps.map((s) => (
              <li key={s.title}><h3>{s.title}</h3><span className="owner">{s.owner}</span></li>
            ))}
          </ol>
          <div className="callout">
            <strong>{cgsc.pipeline.viability.lead}</strong>
            <p>{cgsc.pipeline.viability.body}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <TitleRow kicker="Capability" title={cgsc.capability.title}>
            <p>{cgsc.capability.body}</p>
          </TitleRow>
          <Cards items={cgsc.capability.items} cols={4} numbered />
        </div>
      </section>

      <section className="section mist">
        <div className="shell">
          <TitleRow kicker="Evidence and accountability" title={cgsc.evidence.title}>
            <p>{cgsc.evidence.body}</p>
          </TitleRow>
          <Cards items={cgsc.evidence.items} cols={4} numbered />
          <div className="callout light">
            <strong>{cgsc.evidence.why.lead}</strong>
            <p>{cgsc.evidence.why.body}</p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell site-grid">
          <div>
            <span className="kicker">{cgsc.site.kicker}</span>
            <h2>{cgsc.site.title}</h2>
            <div className="site-stat">
              <strong>{cgsc.site.stat.value}</strong>
              <span>{cgsc.site.stat.unit}<br />{cgsc.site.stat.place}</span>
            </div>
          </div>
          <div>
            <p>{cgsc.site.body}</p>
            <ul className="site-points">
              {cgsc.site.points.map((p) => (<li key={p.title}><strong>{p.title}</strong><span>{p.text}</span></li>))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <TitleRow kicker="Sector alignment" title={cgsc.alignment.title}>
            <p>{cgsc.alignment.body}</p>
          </TitleRow>
          <Cards items={cgsc.alignment.pillars} cols={4} numbered />
          <p className="source-note">{cgsc.alignment.source}</p>
        </div>
      </section>

      <section className="section mist">
        <div className="shell">
          <TitleRow kicker="Differentiators" title="What sets our practice apart">
            <p>Six habits that distinguish the work, from the first conversation to the last service visit.</p>
          </TitleRow>
          <Cards items={cgsc.differentiators} cols={3} />
        </div>
      </section>

      <section className="section cgsc-partners">
        <div className="shell">
          <div className="editorial-row">
            <div><span className="kicker">Who we work with</span><h2>{cgsc.partners.title}</h2><span className="accent-line" /></div>
            <p>{cgsc.partners.body}</p>
          </div>
          <Cards items={cgsc.partners.groups} cols={4} />
          <div className="cgsc-contacts">
            {cgsc.contacts.map((c) => (
              <article key={c.email}>
                <h3>{c.name}</h3>
                <span className="org">{c.org}</span>
                <a href={`tel:${c.phoneHref}`}>{c.phone}</a>
                <a href={`mailto:${c.email}`}>{c.email}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band cta-band">
        <div className="shell">
          <span className="kicker">Let&rsquo;s work together</span>
          <h2>{cgsc.cta.title}</h2>
          <p className="lead">{cgsc.cta.lead}</p>
          <p>{cgsc.cta.body}</p>
          <p className="close">{cgsc.cta.close}</p>
          <a className="button button-orange" href="#contact">Start the conversation</a>
        </div>
      </section>

      <ContactSection variant="inner" />
    </>
  );
}

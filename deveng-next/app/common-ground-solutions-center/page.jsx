import ContactSection from '@/components/ContactSection';

export const metadata = {
  title: { absolute: 'Common Ground Solutions Center | Development Engineering' },
  description: 'Transformative, systemic and compassionate solutions for development and peace.',
};

export default function CommonGroundSolutionsCenterPage() {
  return (
    <>
      <section className="cgsc-hero">
        <div className="shell cgsc-hero-grid">
          <div><h1>Transformative, Systemic, and Compassionate Solutions for Development and Peace</h1><span className="accent-line" /><p className="hero-subcopy">A mission-driven consultancy and capacity-building platform supporting community development, resilience, climate security and peacebuilding.</p></div>
          <div className="cgsc-hero-statement" aria-label="Development Engineering focus areas"><strong>People</strong><strong>Planet</strong><strong>Prosperity</strong><strong>Partnerships</strong><strong>Peace</strong><p>Engineering solutions for a more just, resilient and peaceful world.</p></div>
        </div>
      </section>

      <section className="cgsc-mission"><div className="shell mission-grid"><article><span>Mission</span><h2>Partnering to create integrated, participatory and systems-aware solutions.</h2><p>CGSC partners with communities, governments and allied organizations to co-create solutions to complex development and peacebuilding challenges.</p></article><article><span>Vision</span><h2>Resilient, resourceful and just communities with the capacity to thrive.</h2><p>The Center supports communities as they sustain livelihoods, adapt to ecological and political risks, cultivate peace and live in harmony with people and planet.</p></article></div></section>

      <section className="section cgsc-solutions"><div className="shell"><div className="section-title-row"><div><h2>Our 4Rs Solutions</h2><span className="accent-line" /></div><p>A practical framework for choosing and delivering context-aware development solutions.</p></div><div className="numbered-cards"><article className="numbered-card"><h3>The right solutions</h3><p>Designed with clarity of purpose and minimum adverse impact on people and ecosystems.</p></article><article className="numbered-card"><h3>Rightly done</h3><p>Co-created with communities while respecting culture, knowledge and lived experience.</p></article><article className="numbered-card"><h3>For the right reasons</h3><p>Grounded in ethical intent and long-term thinking rather than short-term expediency.</p></article><article className="numbered-card"><h3>The right mindset</h3><p>System-aware, reflective and respectful of context and scale.</p></article></div></div></section>

      <section className="section cgsc-method"><div className="shell editorial-row"><div><h2>How We Work: A Systems-Based Approach</h2><span className="accent-line" /></div><p>The methodology connects peace, sustainability and climate security. System dynamics, transdisciplinary collaboration and adaptive management help stakeholders explore complex problems, feedback loops and leverage points.</p></div></section>

      <section className="section cgsc-services"><div className="shell"><div className="section-title-row"><div><h2>Our Services</h2><span className="accent-line" /></div><p>Practical support from strategic planning through implementation, learning and capacity building.</p></div><div className="service-rail"><article><span>01</span><h3>Strategic Design &amp; Planning</h3><p>Community diagnostics, participatory assessment, feasibility studies and scenario planning.</p></article><article><span>02</span><h3>Project Implementation</h3><p>Project design and management, monitoring and evaluation, adaptive learning and systems re-alignment.</p></article><article><span>03</span><h3>Modeling &amp; Analytics</h3><p>System dynamics modeling, nexus mapping, leverage-point identification and resilience forecasting.</p></article><article><span>04</span><h3>Capacity Building &amp; Education</h3><p>Training, professional education and practical toolkits and knowledge platforms.</p></article></div></div></section>

      <section className="section cgsc-partners"><div className="shell editorial-row"><div><h2>Who We Work With</h2><span className="accent-line" /></div><div><p>Partners include non-profit organizations, governments and public institutions, foundations and donors, communities and grassroots networks.</p><p><strong>Bernard Amadei and Peter Nzabanita</strong><br /><a href="mailto:bamadei@gmail.com">bamadei@gmail.com</a> <span aria-hidden="true">•</span> <a href="mailto:peter.nzabanita@gmail.com">peter.nzabanita@gmail.com</a></p></div></div></section>
      <ContactSection variant="inner" />
    </>
  );
}

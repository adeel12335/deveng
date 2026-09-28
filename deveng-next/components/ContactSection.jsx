import ContactForm from './ContactForm';
import { site } from '@/lib/site';

/** The homepage band and the inner-page band share one component. */
export default function ContactSection({ variant = 'home' }) {
  if (variant === 'home') {
    return (
      <section className="mock-contact" id="contact">
        <div className="mock-contact-bg" />
        <div className="mock-shell mock-contact-grid">
          <div className="mock-copy reveal reveal-left">
            <h2>Contact Us</h2>
            <span className="mock-rule" />
            <p>Have a question, an idea to share, or an invitation for Bernard? Send us a message and we&rsquo;ll be glad to connect.</p>
          </div>
          <div className="mock-form-card reveal reveal-right">
            <ContactForm variant="home" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-backdrop" aria-hidden="true" />
      <div className="shell contact-grid">
        <div className="section-copy">
          <span className="section-kicker">Contact</span>
          <h2>Contact Us</h2>
          <div className="accent-line" />
          <p>Hey! Have a question for us? Want Bernard to participate in your next event? Use this form to send us an email.</p>
          <div className="contact-inline">
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="form-card">
          <ContactForm variant="inner" />
        </div>
      </div>
    </section>
  );
}

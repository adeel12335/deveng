'use client';

import { useState } from 'react';
import { site } from '@/lib/site';
import { ArrowRight } from './icons';

/**
 * No backend: the form hands off to the visitor's mail client, exactly as the
 * static build did. Set `endpoint` to POST to a form provider instead.
 */
export default function ContactForm({ endpoint = '', variant = 'home' }) {
  const [sent, setSent] = useState(false);
  const btn = variant === 'home' ? 'mock-btn mock-btn-orange' : 'button button-orange';

  const onSubmit = (event) => {
    if (endpoint) return; // let the browser POST normally
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(data.get('subject') || 'DevEng.org website enquiry');
    const body = encodeURIComponent(
      `Name: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\n\n${data.get('message') || ''}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form className="deveng-contact-form" action={endpoint || undefined} method={endpoint ? 'post' : undefined} onSubmit={onSubmit}>
      <div className={variant === 'home' ? 'mock-form-row' : 'form-grid two'}>
        <label><span>Name <em>*</em></span><input name="name" required autoComplete="name" /></label>
        <label><span>Email <em>*</em></span><input type="email" name="email" required autoComplete="email" /></label>
      </div>
      <label><span>Subject <em>*</em></span><input name="subject" required /></label>
      <label><span>Message <em>*</em></span><textarea name="message" rows={5} required /></label>
      <button className={btn} type="submit">Send Message <ArrowRight /></button>
      <div className={`static-contact-status${sent ? ' is-visible' : ''}`}>
        Your email application should open with the message pre-filled.
      </div>
    </form>
  );
}

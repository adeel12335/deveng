'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { heroSlides } from '@/lib/site';
import { ArrowRight } from './icons';

const AUTOPLAY_DELAY = 6500;

function SliderArrow({ direction, onClick }) {
  const isPrevious = direction === 'previous';

  return (
    <button
      className="hero-arrow"
      type="button"
      aria-label={`${isPrevious ? 'Previous' : 'Next'} hero image`}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={isPrevious ? 'M14.5 5 7.5 12l7 7' : 'm9.5 5 7 7-7 7'} />
      </svg>
    </button>
  );
}

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const slideCount = heroSlides.length;
  const paused = hoverPaused || manualPaused;
  const upcoming = (active + 1) % slideCount;

  const goTo = useCallback((index) => {
    setActive((index + slideCount) % slideCount);
  }, [slideCount]);

  const next = useCallback(() => {
    setActive((current) => (current + 1) % slideCount);
  }, [slideCount]);

  // Flipping the loading attribute from lazy to eager does not reliably make a
  // browser re-fetch an image that is already in the DOM, so decode the next
  // one explicitly. By the time it fades in it is ready.
  useEffect(() => {
    const img = new window.Image();
    img.src = heroSlides[upcoming].src;
  }, [upcoming]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduceMotion) return undefined;

    const timer = window.setInterval(next, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [active, next, paused]);

  return (
    <section
      className={`mock-hero${paused ? ' is-paused' : ''}`}
      aria-labelledby="home-title"
      aria-roledescription="carousel"
      aria-label="Development Engineering highlights"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHoverPaused(false);
      }}
    >
      <div className="mock-hero-stage">
        <div className="mock-hero-visual">
          {heroSlides.map((slide, index) => (
            <figure
              className={`hero-slide${index === active ? ' is-active' : ''}`}
              key={slide.src}
              aria-hidden={index !== active}
            >
              <Image
                src={slide.src}
                alt={index === active ? slide.alt : ''}
                fill
                priority={index === 0}
                /* The next slide is fetched while this one is still showing;
                   lazy-loading meant each 300-550KB image only started
                   downloading as it faded in, so the crossfade ran against a
                   blank frame. */
                loading={index === 0 || index === active || index === upcoming ? 'eager' : 'lazy'}
                sizes="(max-width: 900px) 100vw, 52vw"
                style={{ objectPosition: slide.position }}
              />
            </figure>
          ))}
        </div>

        <div className="mock-hero-copy">
          <span className="hero-watermark" aria-hidden="true">
            {String(active + 1).padStart(2, '0')}
          </span>
          <div className="hero-copy-inner">
            <h1 id="home-title">Development<br />Engineering</h1>
            <span className="mock-rule" aria-hidden="true" />
            <p>
              Using engineering knowledge and tools to work with people to build a more just,
              sustainable and peaceful world.
            </p>
            <a className="mock-btn mock-btn-orange" href="#what">
              Explore Development Engineering <ArrowRight />
            </a>
          </div>

          <div className="hero-navigation" aria-label="Hero slider controls">
            <div className="hero-pagination">
              <span className="hero-counter" aria-hidden="true">
                <strong>{String(active + 1).padStart(2, '0')}</strong>
                <span>/</span>
                {String(slideCount).padStart(2, '0')}
              </span>
              <span className="hero-progress" aria-hidden="true">
                <span className="hero-progress-fill" key={active} />
              </span>
              <button
                className="hero-pause"
                type="button"
                aria-label={manualPaused ? 'Resume hero slideshow' : 'Pause hero slideshow'}
                aria-pressed={manualPaused}
                onClick={() => setManualPaused((value) => !value)}
              >
                {manualPaused ? (
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5 8 5-8 5Z" /></svg>
                ) : (
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.5 5.2v9.6M13.5 5.2v9.6" /></svg>
                )}
              </button>
              <div className="hero-inline-arrows">
                <SliderArrow direction="previous" onClick={() => goTo(active - 1)} />
                <SliderArrow direction="next" onClick={next} />
              </div>
            </div>

            <div className="hero-thumbnails" aria-label="Choose a hero image">
              {heroSlides.map((slide, index) => (
                <button
                  type="button"
                  className={`hero-thumbnail${index === active ? ' is-active' : ''}`}
                  key={slide.src}
                  aria-label={`Show slide ${index + 1}: ${slide.label}`}
                  aria-current={index === active ? 'true' : undefined}
                  onClick={() => goTo(index)}
                >
                  <span className="hero-thumbnail-image">
                    <Image src={slide.src} alt="" fill sizes="112px" style={{ objectPosition: slide.position }} />
                  </span>
                  <span>{slide.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="screen-reader-text" aria-live="polite">
          Hero image {active + 1} of {slideCount}: {heroSlides[active].label}. {heroSlides[active].alt}
        </p>
      </div>
    </section>
  );
}

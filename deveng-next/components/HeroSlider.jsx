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
  const [paused, setPaused] = useState(false);
  const slideCount = heroSlides.length;

  const goTo = useCallback((index) => {
    setActive((index + slideCount) % slideCount);
  }, [slideCount]);

  const next = useCallback(() => {
    setActive((current) => (current + 1) % slideCount);
  }, [slideCount]);

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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
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
                sizes="100vw"
                style={{ objectPosition: slide.position }}
              />
            </figure>
          ))}
        </div>

        <div className="mock-hero-copy">
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

          <div className="hero-pagination" aria-label="Choose a hero image">
            <span className="hero-counter" aria-hidden="true">
              <strong>{String(active + 1).padStart(2, '0')}</strong>
              <span>/</span>
              {String(slideCount).padStart(2, '0')}
            </span>
            <span className="hero-progress" aria-hidden="true">
              <span className="hero-progress-fill" key={active} />
            </span>
            <span className="hero-dots">
              {heroSlides.map((slide, index) => (
                <button
                  type="button"
                  className={index === active ? 'is-active' : undefined}
                  key={slide.src}
                  aria-label={`Show hero image ${index + 1} of ${slideCount}`}
                  aria-current={index === active ? 'true' : undefined}
                  onClick={() => goTo(index)}
                />
              ))}
            </span>
          </div>
        </div>

        <div className="hero-arrows">
          <SliderArrow direction="previous" onClick={() => goTo(active - 1)} />
          <SliderArrow direction="next" onClick={next} />
        </div>

        <p className="screen-reader-text" aria-live="polite">
          Hero image {active + 1} of {slideCount}: {heroSlides[active].alt}
        </p>
      </div>
    </section>
  );
}

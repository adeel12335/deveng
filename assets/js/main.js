(() => {
  document.documentElement.classList.add('js');
  const body = document.body;
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const searchToggle = document.querySelector('[data-search-toggle]');
  const searchPanel = document.querySelector('[data-search-panel]');
  const searchInput = document.querySelector('[data-search-input]');
  const submenuToggles = [...document.querySelectorAll('[data-submenu-toggle]')];
  const floatingActions = document.querySelector('[data-floating-actions]');

  requestAnimationFrame(() => body.classList.add('page-ready'));

  const closeMenu = () => {
    body.classList.remove('nav-open');
    toggle?.setAttribute('aria-expanded', 'false');
    submenuToggles.forEach(button => {
      button.setAttribute('aria-expanded', 'false');
      button.closest('.has-submenu')?.classList.remove('is-open');
    });
  };
  const closeSearch = () => {
    body.classList.remove('search-open');
    searchToggle?.setAttribute('aria-expanded', 'false');
    searchPanel?.setAttribute('aria-hidden', 'true');
  };
  toggle?.addEventListener('click', () => {
    const open = body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  submenuToggles.forEach(button => button.addEventListener('click', event => {
    event.stopPropagation();
    const parent = button.closest('.has-submenu');
    const open = !parent?.classList.contains('is-open');
    submenuToggles.forEach(other => {
      const isCurrent = other === button && open;
      other.setAttribute('aria-expanded', isCurrent ? 'true' : 'false');
      other.closest('.has-submenu')?.classList.toggle('is-open', isCurrent);
    });
  }));
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); }, {passive:true});
  searchToggle?.addEventListener('click', () => {
    const open = !body.classList.contains('search-open');
    closeMenu();
    body.classList.toggle('search-open', open);
    searchToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    searchPanel?.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open) requestAnimationFrame(() => searchInput?.focus());
  });
  document.addEventListener('click', event => {
    if (body.classList.contains('search-open') && !event.target.closest('[data-search-panel]') && !event.target.closest('[data-search-toggle]')) closeSearch();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); closeSearch(); } });

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const heroSlides = [...document.querySelectorAll('.mock-hero-slide')];
  document.querySelectorAll('[data-hero-slider]').forEach(slider => {
    const slides = [...slider.querySelectorAll('.mock-hero-slide')];
    const dotsWrap = slider.querySelector('[data-hero-dots]');
    const prev = slider.querySelector('[data-hero-prev]');
    const next = slider.querySelector('[data-hero-next]');
    const pause = slider.querySelector('[data-hero-toggle]');
    const status = slider.querySelector('[data-hero-status]');
    if (slides.length < 2) return;
    let index = 0;
    let timer = 0;
    let paused = reducedMotion.matches;
    let pointerStart = null;
    const dots = slides.map((_, slideIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `mock-hero-dot${slideIndex === 0 ? ' is-active' : ''}`;
      dot.setAttribute('aria-label', `Show slide ${slideIndex + 1}`);
      dot.setAttribute('aria-pressed', slideIndex === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => show(slideIndex, true));
      dotsWrap?.append(dot);
      return dot;
    });
    const updatePause = () => {
      pause?.classList.toggle('is-paused', paused);
      pause?.setAttribute('aria-label', paused ? 'Play hero slider' : 'Pause hero slider');
    };
    const schedule = () => {
      clearTimeout(timer);
      if (!paused && !document.hidden) timer = window.setTimeout(() => show(index + 1, false), 6500);
    };
    function show(nextIndex, userInitiated) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (status) status.textContent = `Slide ${index + 1} of ${slides.length}`;
      if (userInitiated && paused) updatePause();
      schedule();
    }
    prev?.addEventListener('click', () => show(index - 1, true));
    next?.addEventListener('click', () => show(index + 1, true));
    pause?.addEventListener('click', () => { paused = !paused; updatePause(); schedule(); });
    slider.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') pointerStart = event.clientX; }, {passive:true});
    slider.addEventListener('pointerup', event => {
      if (pointerStart === null) return;
      const distance = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(distance) > 45) show(index + (distance < 0 ? 1 : -1), true);
    }, {passive:true});
    slider.addEventListener('mouseenter', () => clearTimeout(timer));
    slider.addEventListener('mouseleave', schedule);
    document.addEventListener('visibilitychange', schedule);
    updatePause();
    schedule();
  });
  let ticking = false;
  const updateScrollEffects = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
    floatingActions?.classList.toggle('is-visible', window.scrollY > 520);
    if (heroSlides.length && !reducedMotion.matches && window.innerWidth > 640) {
      heroSlides.forEach(slide => slide.style.setProperty('--hero-shift', `${Math.min(window.scrollY * .055, 28)}px`));
    }
    ticking = false;
  };
  const requestScrollEffects = () => {
    if (!ticking) { requestAnimationFrame(updateScrollEffects); ticking = true; }
  };
  updateScrollEffects();
  window.addEventListener('scroll', requestScrollEffects, {passive:true});

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (target?.tagName === 'DETAILS') target.open = true;
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    }), {rootMargin:'0px 0px -8% 0px',threshold:.08});
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));

  document.querySelectorAll('[data-principles]').forEach(group => {
    const items = [...group.querySelectorAll('.mock-p')];
    items.forEach(item => item.addEventListener('click', () => {
      items.forEach(button => {
        const active = button === item;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }));
  });

  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (!track) return;
    const amount = () => Math.max(230, Math.round(track.clientWidth * .68));
    prev?.addEventListener('click', () => track.scrollBy({left:-amount(),behavior:'smooth'}));
    next?.addEventListener('click', () => track.scrollBy({left:amount(),behavior:'smooth'}));
    const updateControls = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (prev) prev.disabled = track.scrollLeft <= 4;
      if (next) next.disabled = track.scrollLeft >= max - 4;
    };
    track.addEventListener('scroll', updateControls, {passive:true});
    window.addEventListener('resize', updateControls, {passive:true});
    updateControls();
  });

  document.querySelectorAll('[data-quote-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-quote-track]');
    const quotes = [...carousel.querySelectorAll('blockquote')];
    const prev = carousel.querySelector('[data-quote-prev]');
    const next = carousel.querySelector('[data-quote-next]');
    const status = carousel.querySelector('[data-quote-status]');
    let index = 0;
    const render = () => {
      if (window.innerWidth <= 640) track?.scrollTo({left:(track.clientWidth * index),behavior:reducedMotion.matches ? 'auto' : 'smooth'});
      if (status) status.textContent = `${index + 1} / ${quotes.length}`;
    };
    prev?.addEventListener('click', () => { index = (index - 1 + quotes.length) % quotes.length; render(); });
    next?.addEventListener('click', () => { index = (index + 1) % quotes.length; render(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 640) index = 0; render(); }, {passive:true});
    render();
  });

  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reducedMotion.matches) {
    document.querySelectorAll('[data-tilt-card]').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 3;
        const rotateX = (.5 - (event.clientY - rect.top) / rect.height) * 3;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
    document.querySelectorAll('[data-book-card]').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty('--book-ry', `${x * 8}deg`);
        card.style.setProperty('--book-rx', `${-2 - y * 5}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--book-ry');
        card.style.removeProperty('--book-rx');
      });
    });
  }

  document.querySelectorAll('[data-contact-form]').forEach(form => {
    form.addEventListener('submit', event => {
      const endpoint = form.dataset.endpoint?.trim();
      if (endpoint) return; // normal POST to configured form provider/backend
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get('subject') || 'DevEng.org website enquiry');
      const body = encodeURIComponent(`Name: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\n\n${data.get('message') || ''}`);
      window.location.href = `mailto:bamadei@gmail.com?subject=${subject}&body=${body}`;
      form.querySelector('.static-contact-status')?.classList.add('is-visible');
    });
  });
})();

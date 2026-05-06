(() => {
  const nav          = document.getElementById('nav');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu   = document.getElementById('mobileMenu');
  const navLinks     = document.querySelectorAll('.nav-links a');
  const sections     = document.querySelectorAll('section[id], #website-fetcher');

  // Nav: frosted glass on scroll
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    highlightNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Active nav link based on scroll position
  const highlightNav = () => {
    const y = window.scrollY + 100;
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      if (y >= top && y < bottom) {
        const id = sec.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    mobileToggle.classList.toggle('open', open);
    mobileToggle.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY
                  - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Scroll reveal via IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const aboutTitles = document.querySelectorAll('#about .about-text h2');
  if (aboutTitles.length === 2) {
    const heights = [...aboutTitles].map((h) => Math.round(h.getBoundingClientRect().height));
    console.log('[jasonkopacz.com] about paired blurbs — title block heights (px)', heights, heights[0] === heights[1] ? '(matched)' : '(diff)');
  }

  const projectImgs = document.querySelectorAll('#projects .project-card .project-image img');
  console.log('[jasonkopacz.com] project screenshots', projectImgs.length, [...projectImgs].map((img) => img.getAttribute('src')));

  onScroll();
})();

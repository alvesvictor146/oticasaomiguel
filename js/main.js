document.addEventListener('DOMContentLoaded', () => {
  try {
    /* --- REVEAL ANIMATIONS --- */
    const revealElements = document.querySelectorAll(
      'main > section:not(.hero-section) .blur-reveal, ' +
      'main > section:not(.hero-section) .reveal-text, ' +
      'main > section:not(.hero-section) .mask-reveal, ' +
      'footer.blur-reveal'
    );

    /* --- HEADER SCROLL EFFECT --- */
    const header = document.getElementById('siteHeader');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
      });
    }

    /* --- CUSTOM CURSOR --- */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
      window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;

        if (cursorOutline.animate) {
          cursorOutline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
          }, { duration: 500, fill: 'forwards' });
        } else {
          cursorOutline.style.left = `${e.clientX}px`;
          cursorOutline.style.top = `${e.clientY}px`;
        }
      });

      const interactives = document.querySelectorAll('a, button, input, [data-magnetic]');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
      });
    }

    /* --- MAGNETIC BUTTONS --- */
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });

    /* --- 3D HOVER EFFECT --- */
    document.querySelectorAll('.hover-card-3d').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
      });
    });

    /* --- PARALLAX SCROLL --- */
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
      window.addEventListener('scroll', () => {
        parallaxBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      });
    }

    /* --- INTERSECTION OBSERVER --- */
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      revealElements.forEach(el => observer.observe(el));

      // Safety fallback
      setTimeout(() => {
        revealElements.forEach(el => el.classList.add('active'));
      }, 3500);
    } else {
      revealElements.forEach(el => el.classList.add('active'));
    }
  } catch (error) {
    console.error('main.js error:', error);
    document.querySelectorAll('.blur-reveal, .reveal-text, .mask-reveal')
      .forEach(el => el.classList.add('active'));
  }
});

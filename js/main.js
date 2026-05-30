/* =============================================
   TEX WILLER — Portfolio Site
   main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CUSTOM CURSOR ─── */
  const cursor = document.getElementById('cursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = (e.clientX - 5) + 'px';
    cursor.style.top = (e.clientY - 5) + 'px';
  });

  const hoverTargets = document.querySelectorAll('a, button, .skill-block, .cert-card, .edu-card, .about-meta-item');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(3)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
  });

  /* ─── SCROLL REVEAL ─── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ─── ACTIVE NAV LINK ON SCROLL ─── */
  const sections = document.querySelectorAll('section, div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.opacity = link.getAttribute('href') === `#${id}` ? '1' : '0.5';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => navObserver.observe(section));

  /* ─── SMOOTH SCROLL FOR NAV LINKS ─── */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ─── TYPING ANIMATION ─── */
  const heroName = document.querySelector('.hero-name');

  if (heroName) {
    const lines = ['TEX', 'WILLER'];
    const classes = ['', ' class="accent"'];
    let html = '';

    heroName.innerHTML = '';

    async function typeLine(text, lineIndex) {
      const span = document.createElement('span');
      if (lineIndex === 1) span.className = 'accent';
      heroName.appendChild(span);
      if (lineIndex > 0) heroName.appendChild(document.createTextNode('\n'));

      for (let i = 0; i <= text.length; i++) {
        span.textContent = text.slice(0, i);
        await new Promise(r => setTimeout(r, 80));
      }
    }

    async function typeAll() {
      // Pequeno delay antes de começar
      await new Promise(r => setTimeout(r, 400));
      for (let i = 0; i < lines.length; i++) {
        await typeLine(lines[i], i);
        await new Promise(r => setTimeout(r, 200));
      }
    }

    typeAll();
  }

});

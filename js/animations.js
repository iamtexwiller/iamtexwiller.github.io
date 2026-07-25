/* =============================================
   TEX WILLER — Portfolio Site
   animations.js — GSAP hero entrance + ScrollTrigger storytelling
   Requires: gsap.min.js, ScrollTrigger.min.js (loaded before this file)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof gsap === 'undefined') {
    // CDN blocked or offline: reveal everything immediately instead of
    // leaving it stuck at opacity:0 from the .reveal CSS default.
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    const expLine = document.querySelector('.exp-line-progress');
    if (expLine) expLine.style.height = '100%';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Skip motion entirely: just make sure everything is visible.
    gsap.set('.reveal, .hero-photo, .hero-eyebrow, .hero-word, .hero-role, .hero-stats .stat, .hero-cta > *', {
      opacity: 1,
      y: 0,
      clearProps: 'transform'
    });
    gsap.set('.exp-line-progress', { height: '100%' });
    return;
  }

  /* ─── HERO ENTRANCE ─── */
  const heroTargets = ['.hero-photo', '.hero-eyebrow', '.hero-word', '.hero-role', '.hero-stats .stat', '.hero-cta > *'];
  gsap.set(heroTargets, { opacity: 0, y: 30 });

  const heroTl = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' } });

  heroTl
    .to('.hero-photo', { opacity: 1, y: 0 })
    .to('.hero-eyebrow', { opacity: 1, y: 0 }, '-=0.6')
    .to('.hero-word', { opacity: 1, y: 0, stagger: 0.15 }, '-=0.5')
    .to('.hero-role', { opacity: 1, y: 0 }, '-=0.5')
    .to('.hero-stats .stat', { opacity: 1, y: 0, stagger: 0.1 }, '-=0.4')
    .to('.hero-cta > *', { opacity: 1, y: 0, stagger: 0.1 }, '-=0.4');

  /* ─── HERO STAT COUNTERS ─── */
  // Animates "15+", "6", "1°" etc. counting up from 0, synced with the hero timeline.
  document.querySelectorAll('.stat-num').forEach(el => {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const counter = { val: 0 };

    gsap.to(counter, {
      val: target,
      duration: 1.2,
      ease: 'power2.out',
      delay: 1.15, // lines up with the hero-stats reveal above
      onUpdate: () => {
        el.textContent = Math.floor(counter.val) + suffix;
      },
      onComplete: () => {
        el.textContent = target + suffix; // avoid rounding artifacts at the end
      }
    });
  });

  /* ─── SCROLL STORYTELLING (replaces the old IntersectionObserver reveal) ─── */
  gsap.set('.reveal', { opacity: 0, y: 24 });

  ScrollTrigger.batch('.reveal', {
    start: 'top 85%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        overwrite: true
      });
    }
  });

  /* ─── EXPERIENCE TIMELINE — progressive line draw on scroll ─── */
  const expTimeline = document.querySelector('.exp-timeline');
  const expLineProgress = expTimeline && expTimeline.querySelector('.exp-line-progress');

  if (expTimeline && expLineProgress) {
    gsap.to(expLineProgress, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: expTimeline,
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 0.6
      }
    });
  }

  /* ─── CARD TILT (cert-card & project-card) ───
     Subtle 3D tilt that follows the cursor, only on devices with a
     precise pointer (desktop mouse) — skipped on touch to avoid weirdness. */
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const tiltCards = document.querySelectorAll('.cert-card, .project-card');

  if (supportsFinePointer && tiltCards.length) {
    const MAX_TILT = 5; // degrees — kept subtle so text stays readable

    tiltCards.forEach(card => {
      gsap.set(card, { transformPerspective: 700, transformStyle: 'preserve-3d' });

      const quickRotY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      const quickRotX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      const quickLift = gsap.quickTo(card, 'z', { duration: 0.5, ease: 'power3.out' });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 → 0.5
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        quickRotY(relX * MAX_TILT * 2);
        quickRotX(-relY * MAX_TILT * 2);
        quickLift(12);
        card.style.zIndex = '5';
      });

      card.addEventListener('mouseleave', () => {
        quickRotY(0);
        quickRotX(0);
        quickLift(0);
        card.style.zIndex = '';
      });
    });
  }

  /* ─── MAGNETIC BUTTONS (.btn-main & .btn-line) ───
     The element "pulls" toward the cursor within its own bounds,
     and springs back on mouseleave. Desktop-only, same guard as the tilt. */
  const magneticEls = document.querySelectorAll('.btn-main, .btn-line');

  if (supportsFinePointer && magneticEls.length) {
    const MAGNET_STRENGTH = 0.35; // fraction of cursor offset the element travels

    magneticEls.forEach(el => {
      const quickX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
      const quickY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        quickX(relX * MAGNET_STRENGTH);
        quickY(relY * MAGNET_STRENGTH);
      });

      el.addEventListener('mouseleave', () => {
        quickX(0);
        quickY(0);
      });
    });
  }

  /* ─── TERMINAL DECODE EFFECT (.section-heading) ───
     On scroll-in, each heading's letters flicker through random characters
     before resolving into the real text — like a terminal decoding a log line. */
  const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=-_/\\';

  function scrambleReveal(el, duration = 0.9) {
    const original = el.innerHTML;
    const lines = original.split(/<br\s*\/?>/i);
    const state = { progress: 0 };

    gsap.to(state, {
      progress: 1,
      duration,
      ease: 'none',
      onUpdate: () => {
        const p = state.progress;
        const scrambled = lines.map(line => {
          const len = line.length;
          return line.split('').map((ch, i) => {
            if (ch === ' ' || ch.trim() === '') return ch;
            const charThreshold = len <= 1 ? 0 : i / (len - 1);
            if (p >= charThreshold) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join('');
        });
        el.innerHTML = scrambled.join('<br>');
      },
      onComplete: () => {
        el.innerHTML = original; // guarantees the exact final markup, no leftover artifacts
      }
    });
  }

  document.querySelectorAll('.section-heading').forEach(heading => {
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 85%',
      once: true,
      onEnter: () => scrambleReveal(heading)
    });
  });

});

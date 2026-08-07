/* ============================================
   FOREWRD STUDIO — SHARED NAVIGATION & UI
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  const COLLAPSE_THRESHOLD = 120;

  // --- NAV SCROLL: background + logo collapse ---
  let lastScroll = 0;
  let navTicking = false;

  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 40);
        nav.classList.toggle('collapsed', y > COLLAPSE_THRESHOLD);
        lastScroll = y;
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });

  // --- HAMBURGER ---
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- SIZE GUIDE POPUP ---
  const sizeBtn = document.getElementById('sizeGuideBtn');
  const sizePopup = document.getElementById('sizePopup');
  if (sizeBtn && sizePopup) {
    sizeBtn.addEventListener('click', () => {
      sizePopup.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  // --- ESCAPE KEY ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (sizePopup) { sizePopup.classList.remove('open'); }
      const productModal = document.getElementById('productModal');
      if (productModal) { productModal.classList.remove('open'); }
      document.body.style.overflow = '';
    }
  });

  // --- SCROLL REVEAL ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

/* Shared close functions */
function closeSizePopup() {
  const popup = document.getElementById('sizePopup');
  if (popup) popup.classList.remove('open');
  document.body.style.overflow = '';
}

/* =============================================
   COMMON JS — Chatpata Chat
   Navbar scroll, hamburger, reveal animations
   ============================================= */

(function () {
  'use strict';

  /* --- Navbar Scroll Behavior --- */
  var navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --- Hamburger Menu --- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  var overlay = document.getElementById('navOverlay');

  function openMenu() {
    menu.classList.add('open');
    toggle.classList.add('open');
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  /* Close menu when a nav link is clicked */
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* --- Active Nav Link --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Scroll Reveal (IntersectionObserver) --- */
  var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    /* Fallback: show all immediately */
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }
})();

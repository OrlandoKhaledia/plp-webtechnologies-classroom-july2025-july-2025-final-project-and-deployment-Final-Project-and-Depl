// js/script.js — site-wide interactivity and accessibility enhancements

document.addEventListener('DOMContentLoaded', () => {
  // update copyright years across pages
  const yearEls = document.querySelectorAll('#year, #year-about, #year-services, #year-contact');
  yearEls.forEach(el => el && (el.textContent = new Date().getFullYear()));

  // MENU TOGGLE (mobile)
  const menuToggle = document.querySelectorAll('.menu-toggle');
  const nav = document.getElementById('main-nav');
  menuToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      // also toggle a class so CSS can show/hide
    });
  });

  // smooth scroll for internal links with anchor
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });

  // IntersectionObserver to animate elements when they enter viewport
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // If you want the animation only once — unobserve after seen:
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Add small stagger to cards for better effect
  const cards = document.querySelectorAll('.cards .card');
  cards.forEach((c, idx) => {
    c.style.transitionDelay = `${idx * 90}ms`;
  });

  // Contact form client-side validation and feedback
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Clear previous errors
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      // Simple validation
      let hasError = false;

      if (!name.value.trim() || name.value.trim().length < 2) {
        document.getElementById('nameError').textContent = 'Please enter your full name.';
        hasError = true;
      } else {
        document.getElementById('nameError').textContent = '';
      }

      if (!validateEmail(email.value.trim())) {
        document.getElementById('emailError').textContent = 'Please enter a valid email.';
        hasError = true;
      } else {
        document.getElementById('emailError').textContent = '';
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters.';
        hasError = true;
      } else {
        document.getElementById('messageError').textContent = '';
      }

      const formStatus = document.getElementById('formStatus');
      if (hasError) {
        formStatus.textContent = 'Please fix the issues above and try again.';
        formStatus.style.color = '#b91c1c';
        return;
      }

      // simulate successful submission (replace with real endpoint)
      formStatus.textContent = 'Sending...';
      formStatus.style.color = '#333';

      // Replace this logic with fetch() to your backend or form endpoint (Netlify forms / Formspree)
      setTimeout(() => {
        formStatus.textContent = 'Thanks — we received your message.';
        formStatus.style.color = '#1f9d55';
        contactForm.reset();
      }, 900);
    });
  }

  // Email validation helper
  function validateEmail(email) {
    // simple regex — OK for client side (do server-side validation for production)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

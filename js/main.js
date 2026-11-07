/* =========================================================
   Bayline Plumbing — Shared behavior
   Mobile nav, FAQ accordion, form validation, scroll reveal,
   current year, smooth anchor offset.
   Each block no-ops safely when its target elements are absent.
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Mobile Navigation ---------- */
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    var closeMenu = function () {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      mobileNav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      menuToggle.focus();
    };

    menuToggle.addEventListener('click', function () {
      var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close menu');
        mobileNav.classList.add('is-open');
        document.body.classList.add('nav-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu();
      }
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (mobileNav.classList.contains('is-open')) {
          closeMenu();
        }
      });
    });
  }

  /* ---------- FAQ Accordion ---------- */
  var faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      var answer = document.getElementById(button.getAttribute('aria-controls'));

      faqButtons.forEach(function (other) {
        if (other !== button) {
          other.setAttribute('aria-expanded', 'false');
          var otherAnswer = document.getElementById(other.getAttribute('aria-controls'));
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (answer) answer.hidden = expanded;
    });
  });

  /* ---------- Form Validation & Success State ---------- */
  var form = document.getElementById('estimate-form');
  var successState = document.getElementById('form-success');

  if (form && successState) {
    var fields = {
      name: {
        validate: function (v) { return v.trim().length > 0; }
      },
      email: {
        validate: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
        }
      },
      phone: {
        validate: function (v) {
          return /^[\d\s\-\(\)\+\.]{7,}$/.test(v.trim());
        }
      },
      service: {
        validate: function (v) { return v !== ''; }
      }
    };

    var validateField = function (input) {
      var config = fields[input.name];
      if (!config) return true;
      var group = input.closest('.form-group');
      var valid = config.validate(input.value);
      if (group) {
        group.classList.toggle('has-error', !valid);
        input.setAttribute('aria-invalid', valid ? 'false' : 'true');
      }
      return valid;
    };

    Object.keys(fields).forEach(function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      if (input) {
        input.addEventListener('blur', function () { validateField(input); });
        input.addEventListener('input', function () {
          if (input.closest('.form-group').classList.contains('has-error')) {
            validateField(input);
          }
        });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var firstInvalid = null;

      Object.keys(fields).forEach(function (name) {
        var input = form.querySelector('[name="' + name + '"]');
        if (input) {
          var fieldValid = validateField(input);
          if (!fieldValid && !firstInvalid) firstInvalid = input;
          if (!fieldValid) valid = false;
        }
      });

      if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      form.style.display = 'none';
      successState.classList.add('is-visible');
      successState.setAttribute('tabindex', '-1');
      successState.focus();
    });
  }

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Current Year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Smooth anchor offset for sticky header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var headerHeight = document.querySelector('.site-header').offsetHeight;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });
})();
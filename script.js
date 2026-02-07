// script.js - All JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('active');
    });
  });

  // Contact form handling (prevent default submit, show message)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
    });
  }

  // Project modals (native <dialog>): open on click / Enter / Space
  // Uses dialog.showModal() and dialog.close() [web:17][web:24]
  const projectCards = document.querySelectorAll('.project-card[data-modal], .experience-card[data-modal]');

  projectCards.forEach((card) => {
    const modalId = card.dataset.modal;
    const dialog = document.getElementById(modalId);
    if (!dialog) return;

    const openDialog = () => {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        // Fallback: if <dialog> unsupported, at least show it
        dialog.setAttribute('open', '');
      }
    };

    card.addEventListener('click', openDialog);

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDialog();
      }
    });

    // Close button inside modal
    const closeBtn = dialog.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      });
    }

    // Backdrop click to close (clicking the <dialog> itself, not inner content)
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      }
    });

    // Escape key closes dialog by default for native <dialog>.
    // Some browsers fire "cancel" event; preventDefault stops close, so we DON'T prevent it.
    // (No extra code needed.)
  });
});

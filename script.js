// script.js - All JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
  // Theme toggle (dark/light) + save choice
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      const next = isLight ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks) navLinks.classList.remove("active");
    });
  });

  // Contact form handling (prevent default submit, show message)
  // Contact form handling (AJAX to Formspree - stay on same page)
  const contactForm = document.querySelector("#contact-form");
  const statusEl = document.querySelector("#form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (statusEl) statusEl.textContent = "Sending...";

      const data = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          if (statusEl) statusEl.textContent = "Message sent successfully!";
          contactForm.reset();
        } else {
          const resData = await response.json().catch(() => null);
          if (resData && resData.errors) {
            if (statusEl)
              statusEl.textContent = resData.errors
                .map((e) => e.message)
                .join(", ");
          } else {
            if (statusEl)
              statusEl.textContent =
                "Oops! There was a problem submitting your form.";
          }
        }
      } catch (err) {
        if (statusEl) statusEl.textContent = "Network error. Please try again.";
      }
    });
  }

  // Project modals (native <dialog>): open on click / Enter / Space
  // Uses dialog.showModal() and dialog.close() [web:17][web:24]
  const projectCards = document.querySelectorAll(
    ".project-card[data-modal], .experience-card[data-modal]",
  );

  projectCards.forEach((card) => {
    const modalId = card.dataset.modal;
    const dialog = document.getElementById(modalId);
    if (!dialog) return;

    const openDialog = () => {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        // Fallback: if <dialog> unsupported, at least show it
        dialog.setAttribute("open", "");
      }
    };

    card.addEventListener("click", openDialog);

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDialog();
      }
    });

    // Close button inside modal
    const closeBtn = dialog.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      });
    }

    // Backdrop click to close (clicking the <dialog> itself, not inner content)
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      }
    });

    // Escape key closes dialog by default for native <dialog>.
    // Some browsers fire "cancel" event; preventDefault stops close, so we DON'T prevent it.
    // (No extra code needed.)
  });
});

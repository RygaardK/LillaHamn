// Enhanced JavaScript for Bootstrap integration
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap tooltips if any exist
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const offsetTop = targetElement.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove shadow based on scroll position
    if (scrollTop > 50) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
      navbar.classList.add("shadow");
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.classList.remove("shadow");
    }

    // Show/hide scroll to top button
    const scrollTopBtn = document.querySelector(".scroll-top");
    if (scrollTop > 300) {
      scrollTopBtn?.classList.add("visible");
    } else {
      scrollTopBtn?.classList.remove("visible");
    }

    lastScrollTop = scrollTop;
  });

  // Contact form handling with Bootstrap validation
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Bootstrap form validation
      if (contactForm.checkValidity()) {
        // Form is valid, process submission
        handleFormSubmission(contactForm);
      }

      contactForm.classList.add("was-validated");
    });
  }

  // Form submission handler
  function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Skickar...';

    // Simulate API call
    setTimeout(() => {
      // Show success message
      showAlert(
        "Tack för ditt meddelande! Vi hör av oss inom kort.",
        "success"
      );

      // Reset form
      form.reset();
      form.classList.remove("was-validated");

      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }, 2000);
  }

  // Alert system using Bootstrap alerts
  function showAlert(message, type = "info") {
    // Remove existing alerts
    const existingAlert = document.querySelector(".alert-notification");
    if (existingAlert) {
      existingAlert.remove();
    }

    // Create new alert
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-notification`;
    alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        `;

    alertDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-${
                  type === "success"
                    ? "check-circle"
                    : type === "danger"
                    ? "exclamation-triangle"
                    : "info-circle"
                } me-2"></i>
                <div class="flex-grow-1">${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

    document.body.appendChild(alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentElement) {
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alertDiv);
        bsAlert.close();
      }
    }, 5000);
  }

  // Add scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "btn btn-primary scroll-top";
  scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  scrollTopBtn.setAttribute("aria-label", "Scroll till toppen");

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(scrollTopBtn);

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".card, .value-item, .goal-item, .contact-item"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Enhanced navbar link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink(); // Call once on load

  // Form validation helpers
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  }

  // Add custom validation to form fields
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");

  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        this.setCustomValidity("Vänligen ange en giltig e-postadress");
      } else {
        this.setCustomValidity("");
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("blur", function () {
      if (this.value && !validatePhone(this.value)) {
        this.setCustomValidity("Vänligen ange ett giltigt telefonnummer");
      } else {
        this.setCustomValidity("");
      }
    });
  }

  // Keyboard navigation improvements
  document.addEventListener("keydown", function (e) {
    // Escape key to close mobile menu
    if (e.key === "Escape") {
      const navbarCollapse = document.querySelector(".navbar-collapse.show");
      if (navbarCollapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  });

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debouncing to scroll-heavy functions
  window.addEventListener("scroll", debounce(updateActiveNavLink, 10));

  console.log("Lilla Hamn Bootstrap integration loaded! 🚀");
});

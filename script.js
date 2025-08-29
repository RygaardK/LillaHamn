// Hamburgermeny funktionalitet
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobilmeny
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Stäng menyn när en länk klickas
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling för alla interna länkar
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Kompensera för fast header
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar scroll effekt
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Lägg till bakgrund när man scrollar
    if (scrollTop > 50) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow =
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow =
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
    }

    lastScrollTop = scrollTop;
  });

  // Kontaktformulär hantering
  const contactForm = document.querySelector("form");
  const submitButton = document.querySelector(".submit-button");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Hämta formulärdata
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Enkel validering
    if (!name || !email || !message) {
      showNotification("Vänligen fyll i alla obligatoriska fält.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Vänligen ange en giltig e-postadress.", "error");
      return;
    }

    // Simulera formulärinlämning
    submitButton.disabled = true;
    submitButton.textContent = "Skickar...";

    // Simulera API-anrop
    setTimeout(() => {
      showNotification(
        "Tack för ditt meddelande! Vi hör av oss inom kort.",
        "success"
      );
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = "Skicka meddelande";
    }, 2000);
  });

  // Validering av e-postadress
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notifikationssystem
  function showNotification(message, type = "info") {
    // Ta bort befintliga notifikationer
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Skapa ny notifikation
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${
                  type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"
                }</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

    // Lägg till styling
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            background: ${
              type === "success"
                ? "#10b981"
                : type === "error"
                ? "#ef4444"
                : "#3b82f6"
            };
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            animation: slideInRight 0.3s ease-out;
            transition: all 0.3s ease;
        `;

    // Lägg till animationsstil om den inte finns
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    margin-left: auto;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                .notification-close:hover {
                    opacity: 1;
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Ta bort notifikationen automatiskt efter 5 sekunder
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.transform = "translateX(100%)";
        notification.style.opacity = "0";
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 5000);
  }

  // Intersection Observer för animationer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observera element för animationer
  const animatedElements = document.querySelectorAll(
    ".value-item, .goal-item, .contact-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Keyboard navigation för tillgänglighet
  document.addEventListener("keydown", function (e) {
    // Esc för att stänga mobilmeny
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Förbättra fokushantering för mobilmeny
  navLinks.forEach((link, index) => {
    link.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" && index < navLinks.length - 1) {
        e.preventDefault();
        navLinks[index + 1].focus();
      } else if (e.key === "ArrowUp" && index > 0) {
        e.preventDefault();
        navLinks[index - 1].focus();
      }
    });
  });

  // Lägg till "scroll to top" funktionalitet
  let scrollToTopButton = document.createElement("button");
  scrollToTopButton.innerHTML = "↑";
  scrollToTopButton.setAttribute("aria-label", "Scroll till toppen");
  scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-blue);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;

  document.body.appendChild(scrollToTopButton);

  scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Visa/dölj scroll to top knapp
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopButton.style.opacity = "1";
      scrollToTopButton.style.visibility = "visible";
    } else {
      scrollToTopButton.style.opacity = "0";
      scrollToTopButton.style.visibility = "hidden";
    }
  });

  // Preload viktiga bilder eller resurser (för framtida användning)
  function preloadImage(src) {
    const img = new Image();
    img.src = src;
  }

  // Här kan du lägga till preloading av viktiga bilder när de är tillgängliga
  // preloadImage('path/to/important-image.jpg');

  console.log("Lilla Hamn hemsida laddad! 🏠💙");
});

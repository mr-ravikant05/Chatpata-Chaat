document.documentElement.classList.add("has-motion");

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("[data-site-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const toastStack = document.getElementById("toastStack");
  const currentYearNodes = document.querySelectorAll("[data-current-year]");

  const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      navMenu.classList.toggle("open", !isExpanded);
      header?.classList.toggle("nav-open", !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("open");
        header?.classList.remove("nav-open");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("open");
        header?.classList.remove("nav-open");
      }
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const createToast = (message) => {
    if (!toastStack) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = `<i class="fa-solid fa-circle-check" aria-hidden="true"></i><span>${message}</span>`;
    toastStack.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2800);
  };

  const summaryItems = document.getElementById("summaryTotalItems");
  const summaryAmount = document.getElementById("summaryTotalAmount");
  let orderedItems = 0;
  let orderedAmount = 0;

  const menuCards = document.querySelectorAll("[data-menu-card]");
  menuCards.forEach((card) => {
    const decreaseBtn = card.querySelector("[data-quantity-action='decrease']");
    const increaseBtn = card.querySelector("[data-quantity-action='increase']");
    const quantityValue = card.querySelector("[data-quantity-value]");
    const orderButton = card.querySelector("[data-order-button]");

    if (!quantityValue) return;

    let quantity = Number(quantityValue.textContent);

    const updateQuantity = (nextQuantity) => {
      quantity = Math.max(1, Math.min(9, nextQuantity));
      quantityValue.textContent = String(quantity);
    };

    decreaseBtn?.addEventListener("click", () => updateQuantity(quantity - 1));
    increaseBtn?.addEventListener("click", () => updateQuantity(quantity + 1));

    orderButton?.addEventListener("click", () => {
      const itemName = orderButton.getAttribute("data-item-name") || "Item";
      const itemPrice = Number(orderButton.getAttribute("data-item-price") || 0);

      orderedItems += quantity;
      orderedAmount += quantity * itemPrice;

      if (summaryItems) {
        summaryItems.textContent = String(orderedItems);
      }

      if (summaryAmount) {
        summaryAmount.textContent = String(orderedAmount);
      }

      orderButton.textContent = "Added";
      orderButton.classList.add("btn-secondary");
      orderButton.classList.remove("btn-primary");

      createToast(`${quantity} plate${quantity > 1 ? "s" : ""} of ${itemName} added to your quick order.`);

      setTimeout(() => {
        orderButton.textContent = "Order Now";
        orderButton.classList.add("btn-primary");
        orderButton.classList.remove("btn-secondary");
      }, 1600);
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");
  const contactSuccess = document.getElementById("contactSuccessMessage");
  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      contactSuccess.hidden = false;
      contactSuccess.textContent = "Thanks for contacting Chatpata Chat. We will get back to you shortly.";
      contactForm.reset();
      createToast("Your message has been sent successfully.");
    });
  }

  const homeOrderButtons = document.querySelectorAll("[data-home-order]");
  homeOrderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      createToast("Opening the Chat-Items page for quick ordering.");
    });
  });

  currentYearNodes.forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
});
/* =============================================
   CHAT ITEMS PAGE JS — Chatpata Chat
   Category Filter + Quantity + Order Popup
   ============================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* =========================
       CATEGORY FILTER
    ========================= */
    var catItems = document.querySelectorAll(".cat-item");
    var foodCards = document.querySelectorAll(".food-card");

    catItems.forEach(function (item) {
      item.addEventListener("click", function () {
        catItems.forEach(function (btn) {
          btn.classList.remove("active");
        });

        item.classList.add("active");

        var filter = item.getAttribute("data-filter");

        foodCards.forEach(function (card) {
          var category = card.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    /* =========================
       QUANTITY CONTROLS
    ========================= */
    document.addEventListener("click", function (e) {
      /* Decrease */
      var decreaseBtn = e.target.closest(".qty-decrease");
      if (decreaseBtn) {
        var control = decreaseBtn.closest(".qty-control");
        if (!control) return;

        var valueEl = control.querySelector(".qty-value");
        if (!valueEl) return;

        var currentValue = parseInt(valueEl.textContent, 10) || 1;

        if (currentValue > 1) {
          valueEl.textContent = currentValue - 1;
          animateQty(valueEl);
        }
      }

      /* Increase */
      var increaseBtn = e.target.closest(".qty-increase");
      if (increaseBtn) {
        var control2 = increaseBtn.closest(".qty-control");
        if (!control2) return;

        var valueEl2 = control2.querySelector(".qty-value");
        if (!valueEl2) return;

        var currentValue2 = parseInt(valueEl2.textContent, 10) || 1;

        if (currentValue2 < 20) {
          valueEl2.textContent = currentValue2 + 1;
          animateQty(valueEl2);
        }
      }
    });

    /* =========================
       ORDER POPUP ELEMENTS
    ========================= */
    var orderPopup = document.getElementById("orderPopup");
    var closePopupBtn = document.getElementById("closeOrderPopup");
    var orderForm = document.getElementById("orderForm");

    var popupItemName = document.getElementById("popupItemName");
    var popupItemPrice = document.getElementById("popupItemPrice");
    var popupQuantity = document.getElementById("popupQuantity");
    var popupTotal = document.getElementById("popupTotal");

    var popupMinus = document.getElementById("popupMinus");
    var popupPlus = document.getElementById("popupPlus");

    var customerName = document.getElementById("customerName");
    var customerPhone = document.getElementById("customerPhone");
    var customerAddress = document.getElementById("customerAddress");

    var currentPopupPrice = 0;

    /* =========================
       OPEN POPUP FROM ORDER BUTTON
    ========================= */
    document.addEventListener("click", function (e) {
      var orderBtn = e.target.closest(".food-order-btn");
      if (!orderBtn) return;

      var card = orderBtn.closest(".food-card");
      var itemName = orderBtn.getAttribute("data-item") || "Item";
      var itemPrice = parseInt(orderBtn.getAttribute("data-price") || "0", 10);

      var qtyEl = card ? card.querySelector(".qty-value") : null;
      var qty = qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;

      currentPopupPrice = itemPrice;

      if (popupItemName) popupItemName.value = itemName;
      if (popupItemPrice) popupItemPrice.value = "₹" + itemPrice;
      if (popupQuantity) popupQuantity.value = qty;

      updatePopupTotal();

      if (orderPopup) {
        orderPopup.classList.add("show");
        document.body.style.overflow = "hidden";
      }
    });

    /* =========================
       POPUP CLOSE
    ========================= */
    if (closePopupBtn) {
      closePopupBtn.addEventListener("click", closePopup);
    }

    if (orderPopup) {
      orderPopup.addEventListener("click", function (e) {
        if (e.target === orderPopup) {
          closePopup();
        }
      });
    }

    function closePopup() {
      if (orderPopup) {
        orderPopup.classList.remove("show");
      }
      document.body.style.overflow = "";
    }

    /* =========================
       POPUP QUANTITY
    ========================= */
    if (popupMinus) {
      popupMinus.addEventListener("click", function () {
        if (!popupQuantity) return;
        var qty = parseInt(popupQuantity.value, 10) || 1;
        if (qty > 1) {
          popupQuantity.value = qty - 1;
          updatePopupTotal();
        }
      });
    }

    if (popupPlus) {
      popupPlus.addEventListener("click", function () {
        if (!popupQuantity) return;
        var qty = parseInt(popupQuantity.value, 10) || 1;
        if (qty < 20) {
          popupQuantity.value = qty + 1;
          updatePopupTotal();
        }
      });
    }

    function updatePopupTotal() {
      if (!popupQuantity || !popupTotal) return;
      var qty = parseInt(popupQuantity.value, 10) || 1;
      popupTotal.textContent = currentPopupPrice * qty;
    }

    /* =========================
       ORDER FORM SUBMIT
    ========================= */
    if (orderForm) {
      orderForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var name = customerName ? customerName.value.trim() : "";
        var phone = customerPhone ? customerPhone.value.trim() : "";
        var address = customerAddress ? customerAddress.value.trim() : "";

        var item = popupItemName ? popupItemName.value : "";
        var price = currentPopupPrice;
        var qty = popupQuantity ? parseInt(popupQuantity.value, 10) || 1 : 1;
        var total = price * qty;

        if (!name || !phone || !address) {
          alert("Please fill all details.");
          return;
        }

        alert(
          "Order Placed Successfully!\n\n" +
            "Item: " + item + "\n" +
            "Price: ₹" + price + "\n" +
            "Quantity: " + qty + "\n" +
            "Total: ₹" + total + "\n" +
            "Name: " + name + "\n" +
            "Phone: " + phone + "\n" +
            "Address: " + address
        );

        orderForm.reset();

        if (popupQuantity) popupQuantity.value = 1;
        if (popupTotal) popupTotal.textContent = currentPopupPrice;

        closePopup();
      });
    }

    /* =========================
       QUANTITY ANIMATION
    ========================= */
    function animateQty(el) {
      el.style.transform = "scale(1.2)";
      el.style.transition = "0.2s ease";
      setTimeout(function () {
        el.style.transform = "scale(1)";
      }, 200);
    }
  });
})();
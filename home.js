document.addEventListener('DOMContentLoaded', function () {
  var orderBtns = document.querySelectorAll('.dish-order-btn');
  var orderModal = document.getElementById('orderModal');
  var closeOrderModal = document.getElementById('closeOrderModal');
  var orderForm = document.getElementById('orderForm');
  var orderItem = document.getElementById('orderItem');
  var orderPrice = document.getElementById('orderPrice');
  var orderQty = document.getElementById('orderQty');

  if (!orderBtns.length || !orderModal || !closeOrderModal || !orderForm || !orderItem || !orderPrice || !orderQty) {
    return;
  }

  function openOrderModal(item, price) {
    orderItem.value = item;
    orderPrice.value = price ? '₹' + price : '';
    orderQty.value = 1;
    orderModal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    orderModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  orderBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.getAttribute('data-item') || 'Item';
      var price = btn.getAttribute('data-price') || '';
      openOrderModal(item, price);
    });
  });

  closeOrderModal.addEventListener('click', closeModal);

  orderModal.addEventListener('click', function (e) {
    if (e.target === orderModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && orderModal.classList.contains('active')) {
      closeModal();
    }
  });

  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    alert('Order placed successfully!');
    orderForm.reset();
    closeModal();
  });
});
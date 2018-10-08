'use strict';

(function () {
  // Переключение вкладок в форме оформления заказа;
  // Переключение блока когда будешь платить?
  var payment = document.querySelector('.payment');
  var paymentCard = payment.querySelector('.payment__card-wrap');
  var paymentCash = payment.querySelector('.payment__cash-wrap');

  payment.addEventListener('click', function (evt) {
    if (evt.target.id === 'payment__card') {
      paymentCard.classList.remove('visually-hidden');
      paymentCash.classList.add('visually-hidden');
    } else if (evt.target.id === 'payment__cash') {
      paymentCard.classList.add('visually-hidden');
      paymentCash.classList.remove('visually-hidden');
    }
    window.inputDisabled();
  });

  // Переключение вкладок в блоке доставки
  var deliver = document.querySelector('.deliver');
  var deliverStore = deliver.querySelector('.deliver__store');
  var deliverCourier = deliver.querySelector('.deliver__courier');

  deliver.addEventListener('click', function (evt) {
    if (evt.target.id === 'deliver__store') {
      deliverStore.classList.remove('visually-hidden');
      deliverCourier.classList.add('visually-hidden');
    } else if (evt.target.id === 'deliver__courier') {
      deliverStore.classList.add('visually-hidden');
      deliverCourier.classList.remove('visually-hidden');
    }
    window.inputDisabled();
  });
})();

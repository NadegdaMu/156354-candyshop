'use strict';

(function () {
  // Переключение вкладок в форме оформления заказа;
  // Переключение блока когда будешь платить?
  var payment = document.querySelector('.payment');
  var paymentCard = payment.querySelector('.payment__card-wrap');
  var paymentCash = payment.querySelector('.payment__cash-wrap');
  var paymentCardNumber = payment.querySelector('#payment__card-number');
  var paymentCardDate = payment.querySelector('#payment__card-date');
  var paymentCardCVC = payment.querySelector('#payment__card-cvc');
  var paymentCardCardholder = payment.querySelector('#payment__cardholder');

  payment.addEventListener('click', function (evt) {
    if (evt.target.id === 'payment__card') {
      paymentCard.classList.remove('visually-hidden');
      paymentCash.classList.add('visually-hidden');
      paymentCardNumber.disabled = '';
      paymentCardDate.disabled = '';
      paymentCardCVC.disabled = '';
      paymentCardCardholder.disabled = '';
    } else if (evt.target.id === 'payment__cash') {
      paymentCard.classList.add('visually-hidden');
      paymentCash.classList.remove('visually-hidden');
      paymentCardNumber.disabled = 'disabled';
      paymentCardDate.disabled = 'disabled';
      paymentCardCVC.disabled = 'disabled';
      paymentCardCardholder.disabled = 'disabled';
    }
  });

  // Переключение вкладок в блоке доставки
  var deliver = document.querySelector('.deliver');
  var deliverStore = deliver.querySelector('.deliver__store');
  var deliverCourier = deliver.querySelector('.deliver__courier');
  var deliverStreet = deliver.querySelector('#deliver__street');
  var deliverHouse = deliver.querySelector('#deliver__house');
  var deliverRoom = deliver.querySelector('#deliver__room');
  var deliverFloor = deliver.querySelector('#deliver__floor');
  var deliverDesc = deliver.querySelector('.deliver__textarea');

  if (document.querySelector('#deliver__store').checked === true) {
      deliverStreet.disabled = 'disabled';
      deliverHouse.disabled = 'disabled';
      deliverRoom.disabled = 'disabled';
      deliverFloor.disabled = 'disabled';
      deliverDesc.disabled = 'disabled';
  }

  deliver.addEventListener('click', function (evt) {
    if (evt.target.id === 'deliver__store') {
      deliverStore.classList.remove('visually-hidden');
      deliverCourier.classList.add('visually-hidden');
      deliverStreet.disabled = 'disabled';
      deliverHouse.disabled = 'disabled';
      deliverRoom.disabled = 'disabled';
      deliverFloor.disabled = 'disabled';
      deliverDesc.disabled = 'disabled';
    } else if (evt.target.id === 'deliver__courier') {
      deliverStore.classList.add('visually-hidden');
      deliverCourier.classList.remove('visually-hidden');
      deliverStreet.disabled = '';
      deliverHouse.disabled = '';
      deliverRoom.disabled = '';
      deliverFloor.disabled = '';
      deliverDesc.disabled = '';
    }
  });
})();

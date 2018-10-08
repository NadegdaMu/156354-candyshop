'use strict';

(function () {
  // Проверка правильности номера банковской карты
  var bankCardstatusMessadge = document.querySelector('.payment__card-status');
  var bankCardErrorMessadge = document.querySelector('.payment__error-message');
  var form = document.querySelector('.buy form');
  var paymentInputs = form.querySelector('.payment__inputs');
  var cardInput = document.getElementById('payment__card-number');
  var cardDateInput = document.getElementById('payment__card-date');
  var cardCvcInput = document.getElementById('payment__card-cvc');
  var cardHolderInput = document.getElementById('payment__cardholder');
  var BACKSPACE_KEY = 8;
  var TAB_KEY = 9;
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;

  // Функция, которая проверяет номер по Алгоритму Луна
  var checkCardLuna = function (numberCard) {
    var numberCardArray = numberCard.split('');
    var sum = 0;
    for (var i = 0; i < numberCardArray.length; i++) {
      var number = parseInt(numberCardArray[i], 10);
      if (i % 2 === 0) {
        number *= 2;
        if (number > 9) {
          number = 1 + (number % 10);
        }
      }
      sum += number;
    }
    return (sum % 10) === 0;
  };

  var bankCardInput = document.querySelector('#payment__card-number');

  bankCardInput.addEventListener('input', function () {
    if (parseInt(bankCardInput.value, 10) > 0) {
      if (checkCardLuna(bankCardInput.value)) {
        bankCardstatusMessadge.textContent = 'Такая карта существует :)';
        bankCardErrorMessadge.classList.add('visually-hidden');
      } else {
        bankCardErrorMessadge.classList.remove('visually-hidden');
      }
    } else {
      bankCardErrorMessadge.classList.remove('visually-hidden');
    }
  });

  // Добавление слэша в дату карты
  var maskDate = function (input, evt) {
    var value = cardDateInput.value.replace(/\D/g, '').slice(0, 10);
    if (value.length >= 4 &&
      evt.keyCode !== BACKSPACE_KEY &&
      evt.keyCode !== TAB_KEY &&
      evt.keyCode !== LEFT_KEY &&
      evt.keyCode !== RIGHT_KEY
    ) {
      evt.preventDefault();
    } else if (value.length >= 3) {
      cardDateInput.value = value.slice(0, 2) + '/' + value.slice(2);
    }
  };

  // Ввод только цифр
  var allowNumbersOnly = function (evt) {
    evt.target.value = evt.target.value.replace(/(?!\/)[^\d]/g, '');
  };

  var cardDateInputMask = function (evt) {
    allowNumbersOnly(evt);
    maskDate(cardDateInput, evt);
  };

  var cardInputMask = function (evt) {
    allowNumbersOnly(evt);
    if (cardInput.value.length >= 16 &&
      evt.keyCode !== BACKSPACE_KEY &&
      evt.keyCode !== TAB_KEY &&
      evt.keyCode !== LEFT_KEY &&
      evt.keyCode !== RIGHT_KEY
    ) {
      evt.preventDefault();
    }
  };

  // Проверка валидности номера карты
  var validateCard = function () {
    var cardNumber = cardInput.value.replace(/\s/g, '').trim();
    if (!checkCardLuna(cardNumber)) {
      cardInput.setCustomValidity('Введенная карта невалидна');
    } else {
      cardInput.setCustomValidity('');
    }
    if (cardInput.validity.valid &&
      cardDateInput.validity.valid &&
      cardCvcInput.validity.valid &&
      cardHolderInput.validity.valid
    ) {
      form.querySelector('.payment__card-status').textContent = 'Одобрен';
    } else {
      form.querySelector('.payment__card-status').textContent = 'Не определен';
    }
  };

  // Доставка товара по адресу из списка
  var initDeliver = function () {
    var deliverListElem = document.querySelector('.deliver__store-list');
    var imgElem = document.querySelector('.deliver__store-map-img');
    var imgRoot = 'img/map/';

    var onRadioInputChange = function (evt) {
      var currentInput = evt.target;
      var currentImg = currentInput.value;
      imgElem.src = imgRoot + currentImg + '.jpg';
    };
    deliverListElem.addEventListener('change', onRadioInputChange);
  };

  var onPaymentInputsChange = function (evt) {
    if (evt.target.id === 'payment__card-number') {
      cardInputMask(evt);
    }
    if (evt.target.id === 'payment__card-date') {
      cardDateInputMask(evt);
    }
    validateCard();
  };

  paymentInputs.addEventListener('keyup', onPaymentInputsChange);
  paymentInputs.addEventListener('keydown', onPaymentInputsChange);
  paymentInputs.addEventListener('keypress', onPaymentInputsChange);
  paymentInputs.addEventListener('change', onPaymentInputsChange);
  initDeliver();

})();

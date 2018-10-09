'use strict';

(function () {
  // Проверка правильности номера банковской карты
  var bankCardstatusMessadge = document.querySelector('.payment__card-status');
  var bankCardErrorMessadge = document.querySelector('.payment__error-message');
  var form = document.querySelector('.buy form');
  var paymentInputs = form.querySelector('.payment__inputs');
  var cardNumberInput = document.querySelector('#payment__card-number');
  var cardDateInput = document.querySelector('#payment__card-date');
  var cardCvcInput = document.querySelector('#payment__card-cvc');
  var cardHolderInput = document.querySelector('#payment__cardholder');
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


  cardNumberInput.addEventListener('input', function (evt) {
    allowNumbersOnly(evt);
    if ((parseInt(evt.target.value, 10) > 0) && (evt.target.value.length < 17)) {
      if (checkCardLuna(evt.target.value)) {
        bankCardstatusMessadge.textContent = 'Такая карта существует :)';
        bankCardErrorMessadge.classList.add('visually-hidden');
        evt.target.setCustomValidity('');
      } else {
        bankCardstatusMessadge.textContent = 'СТАТУС КАРТЫ: НЕ ОПРЕДЕЛЁН';
        bankCardErrorMessadge.classList.remove('visually-hidden');
        evt.target.setCustomValidity('Неверный номер карты');
      }
    } else {
      bankCardstatusMessadge.textContent = 'СТАТУС КАРТЫ: НЕ ОПРЕДЕЛЁН';
      bankCardErrorMessadge.classList.remove('visually-hidden');
      evt.target.setCustomValidity('Неверный номер карты');
    }
  });



  // Добавление слэша в дату карты
  var maskDate = function (evt) {
    var value = cardDateInput.value.replace(/\D/g, '').slice(0, 10);
    if (value.length > 6 &&
      evt.keyCode !== BACKSPACE_KEY &&
      evt.keyCode !== TAB_KEY &&
      evt.keyCode !== LEFT_KEY &&
      evt.keyCode !== RIGHT_KEY
    ) {
      cardDateInput.setCustomValidity('Неверная дата карты');
      evt.preventDefault();
    } else if (value.length > 3 && value.length < 6) {
      cardDateInput.value = value.slice(0, 2) + '/' + value.slice(2);
      cardDateInput.setCustomValidity('');
    } else {
      cardDateInput.setCustomValidity('Неверная дата карты');
    }
  };

  cardDateInput.addEventListener("input", function (evt) {
    allowNumbersOnly(evt);
    maskDate(evt);
  });


  cardCvcInput.addEventListener("input", function(evt) {
    allowNumbersOnly(evt);
    if ((parseInt(cardCvcInput.value, 10) >= 100) && (parseInt(cardCvcInput.value, 10) <= 999)) {
      cardCvcInput.setCustomValidity('');
    } else {
      cardCvcInput.setCustomValidity('Неверный cvc');
    }
  });

  cardHolderInput.addEventListener("input", function(evt) {
    allowCharsOnly(evt);
  });
  // Ввод только цифр
  var allowNumbersOnly = function (evt) {
    evt.target.value = evt.target.value.replace(/(?!\/)[^\d]/g, '');
  };

  var allowCharsOnly = function (evt) {
    evt.target.value = evt.target.value.replace(/(?!\/)[^a-zA-Z\s]/g, '');
  }




  // var cardDateInputMask = function (evt) {
  //   allowNumbersOnly(evt);
  //   maskDate(cardDateInput, evt);
  // };

  // var cardInputMask = function (evt) {
  //   allowNumbersOnly(evt);
  //   if (cardInput.value.length >= 16 &&
  //     evt.keyCode !== BACKSPACE_KEY &&
  //     evt.keyCode !== TAB_KEY &&
  //     evt.keyCode !== LEFT_KEY &&
  //     evt.keyCode !== RIGHT_KEY
  //   ) {
  //     evt.preventDefault();
  //    }
  // };

  // // Доставка товара по адресу из списка
  // var initDeliver = function () {
  //   var deliverListElem = document.querySelector('.deliver__store-list');
  //   var imgElem = document.querySelector('.deliver__store-map-img');
  //   var imgRoot = 'img/map/';

  //   var onRadioInputChange = function (evt) {
  //     var currentInput = evt.target;
  //     var currentImg = currentInput.value;
  //     imgElem.src = imgRoot + currentImg + '.jpg';
  //   };
  //   deliverListElem.addEventListener('change', onRadioInputChange);
  // };

  // var onPaymentInputsChange = function (evt) {
  //   if (evt.target.id === 'payment__card-number') {
  //     cardInputMask(evt);
  //   }
  //   if (evt.target.id === 'payment__card-date') {
  //     cardDateInputMask(evt);
  //   }
  // };

  // paymentInputs.addEventListener('keyup', onPaymentInputsChange);
  // paymentInputs.addEventListener('keydown', onPaymentInputsChange);
  // paymentInputs.addEventListener('keypress', onPaymentInputsChange);
  // paymentInputs.addEventListener('change', onPaymentInputsChange);
  // initDeliver();

})();

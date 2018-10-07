'use strict';

(function () {
  // Проверка правильности номера банковской карты
  var bankCardstatusMessadge = document.querySelector('.payment__card-status');
  var bankCardErrorMessadge = document.querySelector('.payment__error-message');

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
})();

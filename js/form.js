'use strict';

(function () {
  var allowNumbersOnly = function (evt) {
    evt.target.value = evt.target.value.replace(/(?!\/)[^\d]/g, '');
  };

  var form = document.querySelector('.buy form');
  // var disabledState = window.shoppingСart.length === 0 ? true : false;

  var customerName = document.querySelector('#contact-data__name');
  customerName.addEventListener('blur', function (evt) {
    evt.target.setCustomValidity('');
    if (!evt.target.checkValidity()) {
      evt.target.setCustomValidity('Имя обязательное поле');
    }
  });

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
  initDeliver();

  var deliverFloor = document.querySelector('#deliver__floor');
  deliverFloor.addEventListener('input', allowNumbersOnly);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (form.checkValidity()) {
      if (window.basket.shoppingСart.length > 0) {
        var formdata = new FormData(form);
        formdata.append('cartItems', JSON.stringify(window.shoppingСart));
        window.backend.uploadData(formdata, window.modals.showSuccessModal, window.modals.showErrorModal);
      }
    }
    return false;
  });
})();

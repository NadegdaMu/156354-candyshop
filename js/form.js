'use strict';

(function () {
  var form = document.querySelector('.buy form');
  var disabledState = window.shoppingСart.length === 0 ? true : false;



  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (form.checkValidity()) {
      // window.backend.uploadData(new FormData(form), window.modals.showSuccessModal(), window.modals.showErrorModal());
      var formdata = new FormData(form);
      formdata.append('cartItems', JSON.stringify(window.shoppingСart));
      for (var pair of formdata.entries()) {
         console.log(pair[0]+ ', '+ pair[1]);
      }

    }
    return false;
  });
})();


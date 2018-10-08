'use strict';

(function () {
  var form = document.querySelector('.buy form');
  var inputs = form.querySelectorAll('input');
  var hiddenInputs = form.querySelectorAll('.visually-hidden input');
  var fieldSets = form.querySelectorAll('fieldset');
  var disabledState = window.shoppingСart ? window.shoppingСart.length === 0 : true;

  var inputDisabled = function () {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = disabledState;
    }
    for (var j = 0; j < fieldSets.length; j++) {
      fieldSets[j].disabled = disabledState;
    }
    for (var k = 0; k < hiddenInputs.length; k++) {
      hiddenInputs[k].disabled = true;
    }
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (form.checkValidity()) {
      window.backend.uploadData(new FormData(form), onLoad, onError);
    }
    return false;
  });
})();


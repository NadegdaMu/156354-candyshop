'use strict';

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (form.checkValidity()) {
    window.backend.uploadData(new FormData(form), onLoad, onError);
  }
  return false;
});

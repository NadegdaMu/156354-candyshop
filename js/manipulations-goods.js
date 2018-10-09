'use strict';

(function () {
  // Добавление выбранного товара в избранное;

  var buttonClickHandler = function (event) {
    event.preventDefault();
    var buttonTarget = event.target;
    buttonTarget.classList.toggle('card__btn-favorite--selected');
  };

  window.buttonFavoriteCollection = function () {
    var buttonCardFavorite = document.querySelectorAll('.card__btn-favorite');
    buttonCardFavorite.forEach(function (element) {
      element.addEventListener('click', buttonClickHandler);
    });
  };
})();

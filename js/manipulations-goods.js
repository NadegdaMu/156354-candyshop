'use strict';

// Добавление выбранного товара в избранное;
var buttonCardFavorite = document.querySelectorAll('.card__btn-favorite');

var buttonClickHandler = function (event) {
  event.preventDefault();
  var buttonTarget = event.target;
  buttonTarget.classList.toggle('card__btn-favorite--selected');
};

buttonCardFavorite.forEach(function (element) {
  element.addEventListener('click', buttonClickHandler);
});

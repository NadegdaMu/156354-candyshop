'use strict';

(function () {
  var goods = document.querySelector('.catalog__cards');
  document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
  document.querySelector('.catalog__load').classList.add('visually-hidden');
  var catalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

  // Функция, определящая какой класс выбирается в зависимости от рейтинга
  var ratingMap = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  };

  var getRatingGoods = function (value, element) {
    element.classList.add('stars__rating--' + ratingMap[value]);
  };

  // Функция, возвращающая определеную строку в зависимости от булевого значения
  var strokeNutritionFacts = function (array) {
    var strokeSugar = '';
    if (array.nutritionFacts.sugar === true) {
      strokeSugar = 'Содержит сахар';
    }
    strokeSugar = 'Без сахара';
    return strokeSugar;
  };

  // Функция отрисовки карточки необычного товара
  var renderItemCard = function (datasCard, id) {
    var goodsElement = catalogTemplate.cloneNode(true);
    goodsElement.querySelector('.card__title').textContent = datasCard.name;
    goodsElement.querySelector('.card__img').src = 'img/cards/' + datasCard.picture;
    goodsElement.querySelector('.card__price').firstChild.textContent = datasCard.price;
    goodsElement.querySelector('.card__weight').textContent = datasCard.weight + 'г';
    var ratingGoods = goodsElement.querySelector('.stars__rating');
    getRatingGoods(datasCard.rating.value, ratingGoods);
    goodsElement.querySelector('.star__count').textContent = '(' + datasCard.rating.number + ')';
    goodsElement.querySelector('.card__characteristic').textContent = strokeNutritionFacts(datasCard);
    goodsElement.querySelector('.card__btn').setAttribute('id', id);
    return goodsElement;
  };

  var renderGoods = function () {
    var fragment = document.createDocumentFragment();
    window.products.forEach(function (element, index) {
      fragment.appendChild(renderItemCard(element, index));
    });
    goods.appendChild(fragment);

  };

  window.products = [];

  var successHandler = function (serverdata) {
    window.products = serverdata;
    renderGoods(window.products);
    window.buttonFavoriteCollection();
    window.buttonSelectionCollection();
  };

  window.backend.loadData(successHandler);

})();

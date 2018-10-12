'use strict';

(function () {
  var goods = document.querySelector('.catalog__cards');
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
    if (datasCard.amount > 5) {
      goodsElement.classList.add('card__footer--available');
    } else if (datasCard.amount > 1) {
      goodsElement.classList.add('card__footer--little');
    } else {
      goodsElement.classList.add('card__footer--soon');
    }
    return goodsElement;
  };

  var renderGoods = function () {
    var fragment = document.createDocumentFragment();
    window.products.forEach(function (element, index) {
      fragment.appendChild(renderItemCard(element, index));
    });
    goods.appendChild(fragment);
  };

  window.globalRenderGoods = function (list) {
    var fragment = document.createDocumentFragment();
    list.forEach(function (element) {
      fragment.appendChild(renderItemCard(element, window.products.indexOf(element)));
    });
    goods.textContent = '';
    goods.appendChild(fragment);
    window.buttonFavoriteCollection();
    window.basket.buttonSelectionCollection();
  };

  window.products = [];

  var getMaxPrice = function () {
    var expensive = window.products.slice().sort(function (left, right) {
      return right.price - left.price;
    });

    return expensive[0].price;
  };

  var getMinPrice = function () {
    var expensive = window.products.slice().sort(function (left, right) {
      return left.price - right.price;
    });

    return expensive[0].price;
  };

  var renderPrices = function () {
    window.utils.MAXPRICE = getMaxPrice();
    window.utils.MINPRICE = getMinPrice();
    document.querySelector('.range__price--min').textContent = window.utils.MINPRICE;
    document.querySelector('.range__price--max').textContent = window.utils.MAXPRICE;
    document.querySelector('.range__count').textContent = '(' + window.products.length + ')';
  };

  var successHandler = function (serverdata) {
    window.products = serverdata;
    window.products.forEach(function (el) {
      el.favorite = 0;
      el.filtered = 0;
    });
    document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
    document.querySelector('.catalog__load').classList.add('visually-hidden');
    renderGoods(window.products);
    renderPrices();
    window.buttonFavoriteCollection();
    window.basket.buttonSelectionCollection();
    window.sortGoods();
  };

  window.backend.loadData(successHandler, window.modals.showErrorModal);
})();

'use strict';

(function () {
  var goods = document.querySelector('.catalog__cards');
  document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
  document.querySelector('.catalog__load').classList.add('visually-hidden');
  var catalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
  var numberObjects = 26;

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

  // Функция, генерирующая один продукт
  var itemProducts = function (i) {
    var product = {};
    product.name = window.utils.getRandomItem(window.utils.names);
    product.picture = 'img/cards/' + window.utils.getRandomItem(window.utils.photo) + '.jpg';
    product.amount = i;
    product.price = window.utils.getRandomInRange(100, 1500);
    product.weight = window.utils.getRandomInRange(30, 300);
    product.rating = {};
    product.rating.value = window.utils.getRandomInRange(1, 5);
    product.rating.number = window.utils.getRandomInRange(1, 900);
    product.nutritionFacts = {};
    product.nutritionFacts.sugar = window.utils.getRandomBoolean();
    product.nutritionFacts.energy = window.utils.getRandomInRange(70, 500);
    product.nutritionFacts.contents = window.utils.getRandomNumberValues(window.utils.ingredients);
    return product;
  };

  // Функция, для создания массива из 26 сгенерированных объектов.
  // Каждый объект массива представляет собой описание товара
  var generatingArrayProducts = function (lengthArray) {
    var arrayProducts = [];
    for (var i = 0; i < lengthArray; i++) {
      arrayProducts[i] = itemProducts(i);
    }
    return arrayProducts;
  };

  window.products = generatingArrayProducts(numberObjects);

  // Функция отрисовки карточки необычного товара
  window.renderItemCard = function (datasCard, id) {
    var goodsElement = catalogTemplate.cloneNode(true);
    goodsElement.querySelector('.card__title').textContent = datasCard.name;
    goodsElement.querySelector('.card__img').src = datasCard.picture;
    goodsElement.querySelector('.card__price').firstChild.textContent = datasCard.price;
    goodsElement.querySelector('.card__weight').textContent = datasCard.weight + 'г';
    var ratingGoods = goodsElement.querySelector('.stars__rating');
    getRatingGoods(datasCard.rating.value, ratingGoods);
    goodsElement.querySelector('.star__count').textContent = '(' + datasCard.rating.number + ')';
    goodsElement.querySelector('.card__characteristic').textContent = strokeNutritionFacts(datasCard);
    goodsElement.querySelector('.card__btn').setAttribute('id', id);
    return goodsElement;
  };

  var fragment = document.createDocumentFragment();
  window.products.forEach(function (element, index) {
    fragment.appendChild(window.renderItemCard(element, index));
  });
  goods.appendChild(fragment);
})();

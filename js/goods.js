'use strict';
var goods = document.querySelector('.catalog__cards');
document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');
var catalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

var names = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

var ingredients = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var photo = [
  'gum-cedar',
  'gum-chile',
  'gum-eggplant',
  'gum-mustard',
  'gum-portwine',
  'gum-wasabi',
  'ice-cucumber',
  'ice-eggplant',
  'ice-garlic',
  'ice-italian',
  'ice-mushroom',
  'ice-pig',
  'marmalade-beer',
  'marmalade-caviar',
  'marmalade-corn',
  'marmalade-new-year',
  'marmalade-sour',
  'marshmallow-bacon',
  'marshmallow-beer',
  'marshmallow-shrimp',
  'marshmallow-spicy',
  'marshmallow-wine',
  'soda-bacon',
  'soda-celery',
  'soda-cob',
  'soda-garlic',
  'soda-peanut-grapes',
  'soda-russian'
];

// Функция возвращающая случайный елемент массива
var getRandomItem = function (array) {
  var randomIndex = array[Math.floor(Math.random() * (array.length))];
  return randomIndex;
};


// Функция генерирующая целое число в диапазоне, включая минимальное и максимальное.
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, генерирующая случайное булевое значение
var getRandomBoolean = function () {
  var someNumber = getRandomInRange(1, 10);
  return (someNumber > 5) ? true : false;
};

// Функция, генерирующая произвольное колличество значений
var getRandomNumberValues = function (array) {
  var productComposition = '';
  var randomNumber = getRandomInRange(1, array.length - 1);
  var i = 0;
  while (i < randomNumber) {
    productComposition += getRandomItem(array);
    i++;
  }
  return productComposition;
};

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
  product.name = getRandomItem(names);
  product.picture = 'img/cards/' + getRandomItem(photo) + '.jpg';
  product.amount = i;
  product.price = getRandomInRange(100, 1500);
  product.weight = getRandomInRange(30, 300);
  product.rating = {};
  product.rating.value = getRandomInRange(1, 5);
  product.rating.number = getRandomInRange(1, 900);
  product.nutritionFacts = {};
  product.nutritionFacts.sugar = getRandomBoolean();
  product.nutritionFacts.energy = getRandomInRange(70, 500);
  product.nutritionFacts.contents = getRandomNumberValues(ingredients);
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

var products = generatingArrayProducts(26);

// Функция отрисовки карточки необычного товара
var renderItemCard = function (datasCard, id) {
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
products.forEach(function (element, index) {
  fragment.appendChild(renderItemCard(element, index));
});
goods.appendChild(fragment);

// Корзина товаров
var basketGoods = document.querySelector('.goods__cards');
var basketGood = basketGoods.querySelector('.goods__card-empty');
basketGoods.classList.remove('goods__cards--empty');
basketGood.classList.add('visually-hidden');

// Добавление выбранного товара в избранное;
var buttonCardFavorite = document.querySelectorAll('.card__btn-favorite');

var buttonClickHandler = function (event) {
  var buttonTarget = event.target;
  buttonTarget.classList.toggle('card__btn-favorite--selected');
};

buttonCardFavorite.forEach(function (element) {
  element.addEventListener('click', buttonClickHandler);
});

// Добавление выбранного товара в корзину;
var buttonProductSelection = goods.querySelectorAll('.card__btn');
var shoppingСart = [];

var getNewProduct = function (selectedProduct) {
  var newProduct = Object.assign({}, selectedProduct);
  delete newProduct.amount;
  newProduct.orderedAmount = 0;
  return newProduct;
};

var buttonClickSelection = function (event) {
  var buttonTargetSelection = event.target.id;
  var product = getNewProduct(products[buttonTargetSelection]);
  shoppingСart.push(product);
  shoppingСart.forEach(function (element) {
    fragment.appendChild(renderItemCard(element));
  });
  basketGoods.appendChild(fragment);
};

buttonProductSelection.forEach(function (element) {
  element.addEventListener('click', buttonClickSelection);
});

// Удаление товара из корзины;
// Управление количеством определенного товара в корзине;
// Переключение вкладок в форме оформления заказа;
// Первая фаза работы фильтра по цене.

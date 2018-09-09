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

var  ingredients = [
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

// Массив товаром в корзине
var goddsBasket = [];

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
  var someNumber = getRandomInRange (1, 10);
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
var getRatingGoods = function (array, element) {
  var value = array.rating.value;
  switch (value) {
    case 1:
    return element.classList.add('.stars__rating--one');
    break;
    case 2:
    return element.classList.add('.stars__rating--two');
    break;
    case 3:
    return element.classList.add('.stars__rating--three');
    break;
    case 4:
    return element.classList.add('.stars__rating--four');
    break;
    default:
    return element.classList.add('.stars__rating--five');
  }
};

//Функция, возвращающая определеную строку в зависимости от булевого значения
var strokeNutritionFacts = function (array) {
  var strokeSugar = '';
  if (array.nutritionFacts.sugar === true) {
    strokeSugar = 'Содержит сахар';
  }
  strokeSugar = 'Без сахара';
  return strokeSugar;
};

// Функция, для создания массива из 26 сгенерированных объектов.
// Каждый объект массива представляет собой описание товара
var generatingArrayProducts = function (lengthArray) {
  var arrayProducts = [];
  for (var i = 0; i < lengthArray; i++) {
    arrayProducts[i] = {};
    arrayProducts[i].name = getRandomItem(names);
    arrayProducts[i].picture = 'img/cards/' + getRandomItem(photo) + '.jpg';
    arrayProducts[i].amount = i;
    arrayProducts[i].price = getRandomInRange(100, 1500);
    arrayProducts[i].weight = getRandomInRange(30, 300);
    arrayProducts[i].rating = {};
    arrayProducts[i].rating.value = getRandomInRange(1, 5);
    arrayProducts[i].rating.number = getRandomInRange(1, 900);
    arrayProducts[i].nutritionFacts = {};
    arrayProducts[i].nutritionFacts.sugar = getRandomBoolean();
    arrayProducts[i].nutritionFacts.energy = getRandomInRange(70, 500);
    arrayProducts[i].nutritionFacts.contents = getRandomNumberValues(ingredients);
  }
  return arrayProducts;
};

var products = generatingArrayProducts(26);
console.log(products);

// Функция отрисовки карточки необычного товара
/*var renderItemCard = function (datasCard) {
  var goodsElement = catalogTemplate.cloneNode(true);
  goodsElement.querySelector('.card__title').textContent = datasCard.name;
  goodsElement.querySelector('.card__img').src = datasCard.picture;
  goodsElement.querySelector('.card__price').firstChild.nodeValue = datasCard.price;
  goodsElement.querySelector('.card__weight').textContent = datasCard.weight + 'г';
  var ratingGoods = goodsElement.querySelector('.stars__rating');
  getRatingGoods(datasCard, ratingGoods);
  goodsElement.querySelector('.star__count').textContent = '(' + datasCard.rating.number + ')';
  goodsElement.querySelector('.card__characteristic').textContent = strokeNutritionFacts(datasCard);
  return goodsElement;
};*/
var goodsElement = catalogTemplate.cloneNode(true);
var renderItemCard = function (datasCard, element) {
  element.querySelector('.card__title').textContent = datasCard.name;
  element.querySelector('.card__img').src = datasCard.picture;
  element.querySelector('.card__price').firstChild.nodeValue = datasCard.price;
  element.querySelector('.card__weight').textContent = datasCard.weight + 'г';
  var ratingGoods = element.querySelector('.stars__rating');
  getRatingGoods(datasCard, ratingGoods);
  element.querySelector('.star__count').textContent = '(' + datasCard.rating.number + ')';
  element.querySelector('.card__characteristic').textContent = strokeNutritionFacts(datasCard);
  return element;
};

var fragment = document.createDocumentFragment();
products.forEach(function (element) {
  fragment.appendChild(renderItemCard(element, goodsElement));
});
goods.appendChild(fragment);

//Корзина товаров
var basketTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

var basketItems = generatingArrayProducts(3);
var fragment = document.createDocumentFragment();
basketItems.forEach(function (element) {
  fragment.appendChild(renderItemCard(element));
});
goods.appendChild(fragment);

'use strict';

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

// функция возвращающая случайный елемент массива
var getRandomItem = function (array) {
  var randomIndex = array[Math.floor(Math.random() * (array.length))];
  return randomIndex;
};


// функция генерирующая целое число в диапазоне, включая минимальное и максимальное.
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция, генерирующая случайное булевое значение
var getRandomBoolean = function () {
  var someNumber = getRandomInRange (1, 10);
  return (someNumber > 5) ? true : false;
};

// функция, генерирующая произвольное колличество значений
var getRandomNumberValues = function (array) {
  var productComposition = '';
  var randomNumber = getRandomInRange(1, array.length - 1);
  var i = 0;
  while (i < randomNumber) {
    productComposition += getRandomItem(array);
  }
  return productComposition;
};

// функция, для создания массива из 26 сгенерированных объектов.
// Каждый объект массива представляет собой описание товара
var generatingArrayProducts = function (argument) {
  var arrayProducts = [];
  for (var i = 0; i < 26; i++) {
    arrayProducts[i] = {};
    arrayProducts[i].name = getRandomItem(names);
    arrayProducts[i].picture = 'img/cards' + getRandomItem(photo) + 'jpg';
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
  return ArrayProducts;
};

var products = generatingArrayProducts();

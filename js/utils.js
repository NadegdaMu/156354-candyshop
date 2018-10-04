'use strict';

(function () {

  window.utils = {
    names: [
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
    ],

    ingredients: [
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
    ],

    photo: [
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
    ],

    // Функция возвращающая случайный елемент массива
    getRandomItem: function (array) {
      var randomIndex = array[Math.floor(Math.random() * (array.length))];
      return randomIndex;
    },

    // Функция генерирующая целое число в диапазоне, включая минимальное и максимальное.
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Функция, генерирующая случайное булевое значение
    getRandomBoolean: function () {
      var someNumber = window.utils.getRandomInRange(1, 10);
      return (someNumber > 5) ? true : false;
    },

    // Функция, генерирующая произвольное колличество значений
    getRandomNumberValues: function (array) {
      var productComposition = '';
      var randomNumber = window.utils.getRandomInRange(1, array.length - 1);
      var i = 0;
      while (i < randomNumber) {
        productComposition += window.utils.getRandomItem(array);
        i++;
      }
      return productComposition;
    }
  };
})();

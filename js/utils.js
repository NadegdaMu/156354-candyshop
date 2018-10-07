'use strict';

(function () {

  window.utils = {

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

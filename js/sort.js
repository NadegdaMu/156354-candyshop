'use strict';

(function () {
  var prodactSortList = document.querySelector('.catalog__filter');

  var nameMap = {
    1: 'Зефир',
    2: 'Жевательная резинка',
    3: 'Мороженое',
    4: 'Газировка',
    5: 'Мармелад'
  }

  // Функция отсортировывающая полученный массив с сервера по названиям
  var getSortNameGoods = function (array, arrayName) {
    var arrayNameGoods = array.filter(function (el) {
      if (el.kind === arrayName) {
        array.push(el);
      }
    })
    return arrayNameGoods;
  };

  // Функция сортирующая по отсутствию сахара в продукте
  var getSugarProdact = function () {
    var arraySugar = array.filter(function (el) {
      if (el.sugar === false) {
        array.push(el);
      }
    })
    return arraySugar;
  }
  // Функция сортирующая по отсутствию глютена
   var getGlutenProdact = function () {
    var arrayGluten = array.filter(function (el) {
      if (el.gluten === false) {
        array.push(el);
      }
    })
    return arrayGluten;
  }
  // Функция сортирующая по отсутствию животных жиров
   var getVegetarianProdact = function () {
    var arrayVegetarian = array.filter(function (el) {
      if (el.vegetarian === true) {
        array.push(el);
      }
    })
    return arrayVegetarian;
  }

  // Функция подсчитывающая колличество ел-ов
  var countElementArray = function (array) {
    var numberElement = array.lenght;
    return numberElement;
  }

  window.sortGoods = function () {
    prodactSortList.querySelector('#filter-icecream ~ input-btn__item-count').text = countElementArray(getSortNameGoods(window.products, nameMap[3]));
    prodactSortList.querySelector('#filter-soda ~ input-btn__item-count').text = countElementArray(getSortNameGoods(window.products, nameMap[4]));
    prodactSortList.querySelector('#filter-gum ~ input-btn__item-count').text = countElementArray(getSortNameGoods(window.products, nameMap[2]));
    prodactSortList.querySelector('#filter-marmalade ~ input-btn__item-count').text = countElementArray(getSortNameGoods(window.products, nameMap[5]));
    prodactSortList.querySelector('#filter-marshmallows ~ input-btn__item-count').text = countElementArray(getSortNameGoods(window.products, nameMap[1]));
  }
})();

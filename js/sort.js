'use strict';

(function () {
  var prodactSortList = document.querySelector('.catalog__filter');

  var kind = {
    icecream: prodactSortList.querySelector('#filter-icecream ~ .input-btn__item-count'),
    soda: prodactSortList.querySelector('#filter-soda ~ .input-btn__item-count'),
    gum: prodactSortList.querySelector('#filter-gum ~ .input-btn__item-count'),
    marmalade: prodactSortList.querySelector('#filter-marmalade ~ .input-btn__item-count'),
    marshmallows: prodactSortList.querySelector('#filter-marshmallows ~ .input-btn__item-count')
  };

  var nutrition = {
    sugarFree: document.querySelector('#filter-sugar-free ~ .input-btn__item-count'),
    vegetarian: document.querySelector('#filter-vegetarian ~ .input-btn__item-count'),
    glutenFree: document.querySelector('#filter-gluten-free ~ .input-btn__item-count')
  };

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
        return true;
      }
    })
    return arrayNameGoods;
  };

  // Функция сортирующая по отсутствию сахара в продукте
  var getSugarProdact = function (array) {
    var arraySugar = array.filter(function (el) {
      if (el.sugar === false) {
        return true;
      }
    })
    return arraySugar;
  }
  // Функция сортирующая по отсутствию глютена
   var getGlutenProdact = function (array) {
    var arrayGluten = array.filter(function (el) {
      if (el.gluten === false) {
        return true;
      }
    })
    return arrayGluten;
  }
  // Функция сортирующая по отсутствию животных жиров
   var getVegetarianProdact = function (array) {
    var arrayVegetarian = array.filter(function (el) {
      if (el.vegetarian === true) {
        return true;
      }
    })
    return arrayVegetarian;
  }

  // Функция подсчитывающая колличество ел-ов
  var countElementArray = function (array) {
    var numberElement = array.length;
    return numberElement;
  }

  window.sortGoods = function () {
    kind.icecream.textContent ='(' + countElementArray(getSortNameGoods(window.products, nameMap[3])) + ')';
    kind.soda.textContent ='(' + countElementArray(getSortNameGoods(window.products, nameMap[4])) + ')';
    kind.gum.textContent ='(' + countElementArray(getSortNameGoods(window.products, nameMap[2])) + ')';
    kind.marmalade.textContent ='(' + countElementArray(getSortNameGoods(window.products, nameMap[5])) + ')';
    kind.marshmallows.textContent ='(' + countElementArray(getSortNameGoods(window.products, nameMap[1])) + ')';
    nutrition.sugarFree.textContent ='(' + countElementArray(getSugarProdact(window.products)) + ')';
    nutrition.vegetarian.textContent ='(' + countElementArray(getVegetarianProdact(window.products)) + ')';
    nutrition.glutenFree.textContent ='(' + countElementArray(getGlutenProdact(window.products)) + ')';
  }
})();

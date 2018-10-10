'use strict';

(function () {
  var prodactSortList = document.querySelector('.catalog__filter');
  var labelCollection = document.querySelectorAll('.catalog__filter > .input-btn > .input-btn__input + label');
  var filterList = [];
  var kind = {
    icecream: prodactSortList.querySelector('#filter-icecream'),
    soda: prodactSortList.querySelector('#filter-soda'),
    gum: prodactSortList.querySelector('#filter-gum'),
    marmalade: prodactSortList.querySelector('#filter-marmalade'),
    marshmallows: prodactSortList.querySelector('#filter-marshmallows')
  };

  var nutrition = {
    sugarFree: document.querySelector('#filter-sugar-free'),
    vegetarian: document.querySelector('#filter-vegetarian'),
    glutenFree: document.querySelector('#filter-gluten-free')
  };

  var popula = {
    favorite: document.querySelector('#filter-favorite'),
    amount: document.querySelector('#filter-availability')
  };

  var nameMap = {
    1: 'Зефир',
    2: 'Жевательная резинка',
    3: 'Мороженое',
    4: 'Газировка',
    5: 'Мармелад'
  };

  var getSortIcecream = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      if (el.kind === 'Мороженое') {
        return true;
      }
    })
    return arrayNameGoods;
  };
  var getSortSoda = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      if (el.kind === 'Газировка') {
        return true;
      }
    })
    return arrayNameGoods;
  };
  var getSortGum = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      if (el.kind === 'Жевательная резинка') {
        return true;
      }
    })
    return arrayNameGoods;
  };
  var getSortMarmalade = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      if (el.kind === 'Мармелад') {
        return true;
      }
    })
    return arrayNameGoods;
  };
  var getSortMarshmallows = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      if (el.kind === 'Зефир') {
        return true;
      }
    })
    return arrayNameGoods;
  };
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
      if (el.nutritionFacts.sugar === false) {
        return true;
      }
    })
    return arraySugar;
  };
  // Функция сортирующая по отсутствию глютена
   var getGlutenProdact = function (array) {
    var arrayGluten = array.filter(function (el) {
      if (el.nutritionFacts.gluten === false) {
        return true;
      }
    })
    return arrayGluten;
  };

  // Функция сортирующая по отсутствию животных жиров
   var getVegetarianProdact = function (array) {
    var arrayVegetarian = array.filter(function (el) {
      if (el.nutritionFacts.vegetarian === true) {
        return true;
      }
    })
    return arrayVegetarian;
  };

  // Функция подсчитывающая колличество ел-ов
  var countElementArray = function (array) {
    var numberElement = array.length;
    return numberElement;
  };

  // Функция по колличеству
  var getАmountGoods = function (array) {
    var arrayАmount = array.filter(function (el) {
      if (el.amount > 0) {
        return true;
      }
    })
    return arrayАmount;
  };

  // Функция Сначало популярные
  var getPopulaGoods = function () {
    return window.products;
  };

  // Функция сначало дорогие
  var getExpensiveGoods = function (array) {
    var expensive = array.slice().sort(function (left, right) {
      return right.price - left.price;
    });

    return expensive;
  };
  // Функция сначало дешевые
  var getCheapGoods = function (array) {
    var cheap = array.slice().sort(function (left, right) {
      return  left.price - right.price;
    });
    return cheap;
  };
  // Функция favorite
  window.getGoodsByPrice = function () {
    if (filterList.length === 0 ) {
      var array = window.products;
    } else {
      var array = filterList;
    }
    var minprice = document.querySelector('.range__price--min').textContent;
    var maxprice = document.querySelector('.range__price--max').textContent;

    var filterListByPrice = array.filter(function (el) {
      if ((el.price >= minprice) && (el.price <= maxprice)) return true;
    });

    if (filterListByPrice.length === 0) {
      window.globalRenderGoods(filterListByPrice);
      document.querySelector('.range__count').textContent = '(' + filterListByPrice.length + ')';
      console.log("empty-block");
    } else {
      window.globalRenderGoods(filterListByPrice);
      document.querySelector('.range__count').textContent = '(' + filterListByPrice.length + ')';
    }
  };

  var getFavoriteGoods = function (array) {
    var cheap = array.filter(function (el) {
      if (el.favorite === 1) return true;
    });
    return cheap;
  };

  // Функция по рейтингу
  var filterByRating = function (array) {
    var rating = [];
    var ratingValue = [];
    for (var i = 5; i >= 0; i--) {
      ratingValue = array.filter(function (el) {
        if (el.rating.value === i) {
          return true;
        }
      })
      rating = rating.concat(ratingValue.sort(function (left, right) {
        return right.rating.number - left.rating.number;
      }));
    }
    return rating;
  };
  window.countFavorite = function () {
    popula.favorite.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getFavoriteGoods(window.products)) + ')';
  }

  // Функция выводящая отсортированные массивы на страницу
  window.sortGoods = function () {
    kind.icecream.nextElementSibling.nextElementSibling.textContent ='(' + countElementArray(getSortIcecream(window.products)) + ')';
    kind.soda.nextElementSibling.nextElementSibling.textContent ='(' + countElementArray(getSortSoda(window.products)) + ')';
    kind.gum.nextElementSibling.nextElementSibling.textContent ='(' + countElementArray(getSortGum(window.products)) + ')';
    kind.marmalade.nextElementSibling.nextElementSibling.textContent ='(' + countElementArray(getSortMarmalade(window.products)) + ')';
    kind.marshmallows.nextElementSibling.nextElementSibling.textContent ='(' + countElementArray(getSortMarshmallows(window.products)) + ')';
    nutrition.sugarFree.nextElementSibling.nextElementSibling.textContent ='(' + countElementArray(getSugarProdact(window.products)) + ')';
    nutrition.vegetarian.nextElementSibling.nextElementSibling.textContent ='(' + countElementArray(getVegetarianProdact(window.products)) + ')';
    nutrition.glutenFree.nextElementSibling.nextElementSibling.textContent ='(' + countElementArray(getGlutenProdact(window.products)) + ')';
    popula.favorite.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getFavoriteGoods(window.products)) + ')';
    popula.amount.nextElementSibling.nextElementSibling.textContent =  '(' + countElementArray(getАmountGoods(window.products)) + ')';
  };

  var filterMap = {
     'filter-icecream': getSortIcecream,
     'filter-soda': getSortSoda,
     'filter-gum': getSortGum,
     'filter-marmalade': getSortMarmalade,
     'filter-marshmallows': getSortMarshmallows,
     'filter-sugar-free':getSugarProdact,
     'filter-vegetarian':getVegetarianProdact,
     'filter-gluten-free':getGlutenProdact,
     'filter-favorite':getFavoriteGoods,
     'filter-availability':getАmountGoods,
     'filter-popular':getPopulaGoods,
     'filter-expensive':getExpensiveGoods,
     'filter-cheep':getCheapGoods,
     'filter-rating':filterByRating
  };


  var filterClickHandler = function (event) {
    var currentFilter = event.target.htmlFor;
    var filterForm = document.querySelector('.catalog__form');
    if (currentFilter === 'filter-availability' || currentFilter === 'filter-favorite') {
      filterList = [];
    }
    if (filterList.length === 0) {
      filterList = filterMap[currentFilter](window.products);
    } else {
      filterList = filterMap[currentFilter](filterList);
    }

    if (filterList.length === 0) {
      window.globalRenderGoods(filterList);
      console.log("empty-block");
    } else {
      window.globalRenderGoods(filterList);
    }

  };

  labelCollection.forEach(function(el) {
    el.addEventListener("click", filterClickHandler);
  });

  var showAllBtn =  document.querySelector('.catalog__submit');
  showAllBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    filterList = [];
    var catalogFilterRange = document.querySelector('.range');
  var leftPin = catalogFilterRange.querySelector('.range__btn--left');
  var rightPin = catalogFilterRange.querySelector('.range__btn--right');
  var rangeFilter = catalogFilterRange.querySelector('.range__filter');
  var range = rangeFilter.clientWidth; // ширина бара фильтра = диапазон
    var rangeFillLine = catalogFilterRange.querySelector('.range__fill-line');
  var pinSize = 10;

  // выставим начальные значения пина и бара;
  leftPin.style.left = 0;
  // rightPin.style.right = 0;
  rightPin.style.left = 235 + 'px';
  rangeFillLine.style.left = (leftPin.offsetLeft) + pinSize + 'px';
  rangeFillLine.style.right = pinSize + 'px';
  document.querySelector('.range__price--min').textContent = window.MINPRICE;
    document.querySelector('.range__price--max').textContent = window.MAXPRICE;
    document.querySelector('.range__count').textContent = '(' + window.products.length + ')';
    window.globalRenderGoods(window.products);
    return false;
  });
})();

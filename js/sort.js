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

  // Функция шаблона пусторого фильтра
  var emptyFilter = function () {
    var goods = document.querySelector('.catalog__cards');
    var filterEmtyTemplate = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
    var filter = filterEmtyTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(filter);
    goods.appendChild(fragment);
  };

  var getSortIcecream = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      return el.kind === 'Мороженое';
    });
    return arrayNameGoods;
  };

  var getSortSoda = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      return el.kind === 'Газировка';
    });
    return arrayNameGoods;
  };

  var getSortGum = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      return el.kind === 'Жевательная резинка';
    });
    return arrayNameGoods;
  };

  var getSortMarmalade = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      return el.kind === 'Мармелад';
    });
    return arrayNameGoods;
  };

  var getSortMarshmallows = function (array) {
    var arrayNameGoods = array.filter(function (el) {
      return el.kind === 'Зефир';
    });
    return arrayNameGoods;
  };

  // Функция сортирующая по отсутствию сахара в продукте
  var getSugarProdact = function (array) {
    var arraySugar = array.filter(function (el) {
      return el.nutritionFacts.sugar === false;
    });
    return arraySugar;
  };
  // Функция сортирующая по отсутствию глютена
  var getGlutenProdact = function (array) {
    var arrayGluten = array.filter(function (el) {
      return el.nutritionFacts.gluten === false;
    });
    return arrayGluten;
  };

  // Функция сортирующая по отсутствию животных жиров
  var getVegetarianProdact = function (array) {
    var arrayVegetarian = array.filter(function (el) {
      return el.nutritionFacts.vegetarian === true;
    });
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
      return el.amount > 0;
    });
    return arrayАmount;
  };

  // Функция Сначало популярные
  var getPopularGoods = function () {
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
      return left.price - right.price;
    });
    return cheap;
  };
  // Функция favorite
  window.getGoodsByPrice = function () {
    if (filterList.length === 0) {
      var array = window.products;
    } else {
      array = filterList;
    }
    var minprice = document.querySelector('.range__price--min').textContent;
    var maxprice = document.querySelector('.range__price--max').textContent;

    var filterListByPrice = array.filter(function (el) {
      return (el.price >= minprice) && (el.price <= maxprice);
    });

    if (filterListByPrice.length === 0) {
      window.globalRenderGoods(filterListByPrice);
      document.querySelector('.range__count').textContent = '(' + filterListByPrice.length + ')';
      emptyFilter();
    } else {
      window.globalRenderGoods(filterListByPrice);
      document.querySelector('.range__count').textContent = '(' + filterListByPrice.length + ')';
    }
  };

  var getFavoriteGoods = function (array) {
    var cheap = array.filter(function (el) {
      return el.favorite === 1;
    });
    return cheap;
  };

  // Функция по рейтингу
  var filterByRating = function (array) {
    var rating = [];
    var ratingValue = [];
    for (var i = 5; i >= 0; i--) {
      ratingValue = array.filter(function (el) {
        return el.rating.value === i;
      });
      rating = rating.concat(ratingValue.sort(function (left, right) {
        return right.rating.number - left.rating.number;
      }));
    }
    return rating;
  };

  var selectFiltered = function () {
     var filteredList = window.products.filter(function (el) {
      return el.filtered === 1;
    });
    return filteredList;
  }


  window.countFavorite = function () {
    popula.favorite.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getFavoriteGoods(window.products)) + ')';
  };

  // Функция выводящая колличество эл-ов в отсортированных массивов на страницу
  window.sortGoods = function () {
    kind.icecream.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getSortIcecream(window.products)) + ')';
    kind.soda.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getSortSoda(window.products)) + ')';
    kind.gum.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getSortGum(window.products)) + ')';
    kind.marmalade.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getSortMarmalade(window.products)) + ')';
    kind.marshmallows.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getSortMarshmallows(window.products)) + ')';
    nutrition.sugarFree.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getSugarProdact(window.products)) + ')';
    nutrition.vegetarian.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getVegetarianProdact(window.products)) + ')';
    nutrition.glutenFree.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getGlutenProdact(window.products)) + ')';
    popula.favorite.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getFavoriteGoods(window.products)) + ')';
    popula.amount.nextElementSibling.nextElementSibling.textContent = '(' + countElementArray(getАmountGoods(window.products)) + ')';
  };

  var filterMap = {
    'filter-icecream': getSortIcecream,
    'filter-soda': getSortSoda,
    'filter-gum': getSortGum,
    'filter-marmalade': getSortMarmalade,
    'filter-marshmallows': getSortMarshmallows,
    'filter-sugar-free': getSugarProdact,
    'filter-vegetarian': getVegetarianProdact,
    'filter-gluten-free': getGlutenProdact,
    'filter-favorite': getFavoriteGoods,
    'filter-availability': getАmountGoods,
    'filter-popular': getPopularGoods,
    'filter-expensive': getExpensiveGoods,
    'filter-cheep': getCheapGoods,
    'filter-rating': filterByRating
  };


  var filterClickHandler = function (event) {
    var currentFilter = event.target.htmlFor;
    if (currentFilter === 'filter-availability') {
      filterList = filterMap[currentFilter](window.products);;
      if (document.querySelector('#filter-favorite').checked === true) {
        document.querySelector('#filter-favorite').checked = false;
      }
      Object.keys(filterMap).forEach(function (el) {
        if (el !== currentFilter) {
          document.querySelector('#' + el).checked = false;
        }
      });

    } else if (currentFilter === 'filter-favorite') {
      filterList = filterMap[currentFilter](window.products);
      if (document.querySelector('#filter-availability').checked === true) {
        document.querySelector('#filter-availability').checked = false;
      }
      Object.keys(filterMap).forEach(function (el) {
        if (el !== currentFilter) {
          document.querySelector('#' + el).checked = false;
        }
      });
    } else if (currentFilter === 'filter-expensive' || currentFilter == 'filter-cheep' || currentFilter == 'filter-rating') {
      filterList = selectFiltered();
      if (filterList.length === 0) {
        filterList = filterMap[currentFilter](window.products);
      } else {
        filterList = filterMap[currentFilter](filterList);
      }
      document.querySelector('#filter-favorite').checked = false;
      document.querySelector('#filter-availability').checked = false;
    } else if (currentFilter === 'filter-popular') {
      window.products.forEach(function (el) {
        el.filtered = 0;
      })
      filterList = window.products;
      Object.keys(filterMap).forEach(function (el) {
        if (el !== currentFilter) {
          document.querySelector('#' + el).checked = false;
        }
      });

    } else {
      document.querySelector('#filter-favorite').checked = false;
      document.querySelector('#filter-availability').checked = false;
      var flist = filterMap[currentFilter](window.products);
      if(document.querySelector('#' + currentFilter).checked === true) {
        flist.forEach(function (el) {
          el.filtered = 0;
        })
      } else {
        flist.forEach(function (el) {
          el.filtered = 1;
        })
      }
      filterList = selectFiltered();
      document.querySelector('#filter-popular').checked = false;
    }



    if (filterList.length === 0 && !nothingChecked()) {
      window.product;
      document.querySelector('#filter-popular').checked = true;
      window.globalRenderGoods(window.products);
    } else if (filterList.length === 0 && nothingChecked()) {
      window.globalRenderGoods(filterList);
      emptyFilter();
    } else {
      window.globalRenderGoods(filterList);
    }
  };

  var nothingChecked = function () {
    var flag = true;
    Object.keys(filterMap).forEach(function (el) {
      if (document.querySelector('#' + el).checked === true) {
        flag = false;
      }
    });
    return flag;
  }

  labelCollection.forEach(function (el) {
    el.addEventListener('click', filterClickHandler);
  });

  var showAllBtn = document.querySelector('.catalog__submit');
  showAllBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    filterList = [];
    var catalogFilterRange = document.querySelector('.range');
    var leftPin = catalogFilterRange.querySelector('.range__btn--left');
    var rightPin = catalogFilterRange.querySelector('.range__btn--right');
    var rangeFillLine = catalogFilterRange.querySelector('.range__fill-line');
    var pinSize = 10;
    var stepLeft = 235;
    // выставим начальные значения пина и бара;
    leftPin.style.left = 0;
    rightPin.style.left = stepLeft + 'px';
    rangeFillLine.style.left = (leftPin.offsetLeft) + pinSize + 'px';
    rangeFillLine.style.right = pinSize + 'px';
    document.querySelector('.range__price--min').textContent = window.utils.MINPRICE;
    document.querySelector('.range__price--max').textContent = window.utils.MAXPRICE;
    document.querySelector('.range__count').textContent = '(' + window.products.length + ')';
    window.globalRenderGoods(window.products);
    return false;
  });
})();

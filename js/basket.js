'use strict';

(function () {
  // Корзина товаров
  var goods = document.querySelector('.catalog__cards');
  var basketGoods = document.querySelector('.goods__cards');
  var basketGood = basketGoods.querySelector('.goods__card-empty');
  basketGoods.classList.remove('goods__cards--empty');
  basketGood.classList.add('visually-hidden');
  var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

  // Добавление выбранного товара в корзину;
  var shoppingСart = []; // Массив для товаров в корзине

  // Функция которая копирует ссылку объекта с одно массива и помещает в другой объект
  var getNewProduct = function (id, selectedProduct) {
    var newProduct = Object.assign({}, selectedProduct);
    delete newProduct.amount;
    newProduct.orderedAmount = 1;
    newProduct.id = id;
    return newProduct;
  };

  // Функция счетчика корзины в шапке
  var basketCount = document.querySelector('.main-header__basket');

  var countCart = function (array) {
    var count = 0;
    var costTotal = 0;
    for (var i = 0; i < array.length; i++) {
      costTotal += array[i].orderedAmount * array[i].price;
      count += array[i].orderedAmount;
    }
    return [count, costTotal];
  };

  var renderItemCardBasket = function (obj) {
    var goodsElementBasket = basketTemplate.cloneNode(true);
    goodsElementBasket.querySelector('.card-order__title').textContent = obj.name;
    goodsElementBasket.querySelector('.card-order__img').src = 'img/cards/' + obj.picture;
    goodsElementBasket.querySelector('.card-order__price').textContent = obj.price;
    return goodsElementBasket;
  };

  var buttonClickSelection = function (event) {
    event.preventDefault();
    var buttonTargetSelection = event.target.id;
    var foundInCart = false;
    shoppingСart.forEach(function (element) {
      if (element.id === buttonTargetSelection) {
        element.orderedAmount++;
        foundInCart = true;
      }
    });
    if (foundInCart === false) {
      var product = getNewProduct(buttonTargetSelection, window.products[buttonTargetSelection]);
      shoppingСart.push(product);
    }
    var fragment = document.createDocumentFragment();
    shoppingСart.forEach(function (element) {
      fragment.appendChild(renderItemCardBasket(element));
    });
    basketGoods.textContent = ' ';
    basketGoods.appendChild(fragment);
    var cost = countCart(shoppingСart);
    basketCount.textContent = 'В корзине товаров: ' + cost[0] + ' на сумму: ' + cost[1] + '₽';
  };

  window.buttonBasketCollection = function () {
    var buttonProductSelection = goods.querySelectorAll('.card__btn');
    buttonProductSelection.forEach(function (element) {
      element.addEventListener('click', buttonClickSelection);
    });
  };
})();

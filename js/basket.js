'use strict';

(function () {
  // Корзина товаров
  var goods = document.querySelector('.catalog__cards');
  var basketGoods = document.querySelector('.goods__cards');
  var basketGood = basketGoods.querySelector('.goods__card-empty');
  basketGoods.classList.remove('goods__cards--empty');
  var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
  var basketOformlayem = document.querySelector('.goods__total');
  // Добавление выбранного товара в корзину;

  // Функция которая копирует ссылку объекта с одно массива и помещает в другой объект
  var getNewProduct = function (id, selectedProduct) {
    var newProduct = Object.assign({}, selectedProduct);
    // delete newProduct.amount;
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

  var renderItemCardBasket = function (obj, id) {
    var goodsElementBasket = basketTemplate.cloneNode(true);
    goodsElementBasket.querySelector('.card-order__title').textContent = obj.name;
    goodsElementBasket.querySelector('.card-order__img').src = 'img/cards/' + obj.picture;
    goodsElementBasket.querySelector('.card-order__price').textContent = obj.price + ' ₽';
    goodsElementBasket.querySelector('.card-order__close').id = id;
    goodsElementBasket.querySelector('.card-order__close').addEventListener('click', buttonClickDelete);
    goodsElementBasket.querySelector('.card-order__count').value = obj.orderedAmount;
    goodsElementBasket.querySelector('.card-order__btn--increase').id = id;
    goodsElementBasket.querySelector('.card-order__btn--increase').addEventListener('click', increasetItemCard);
    goodsElementBasket.querySelector('.card-order__btn--decrease').id = id;
    goodsElementBasket.querySelector('.card-order__btn--decrease').addEventListener('click', decreasetItemCard);
    if (obj.orderedAmount >= obj.amount) {
      goodsElementBasket.querySelector('.card-order__btn--increase').disabled = 'disabled';
    }
    return goodsElementBasket;
  };

  var buttonClickSelection = function (event) {
    event.preventDefault();
    var buttonTargetSelection = event.target.id;
    var foundInCart = false;
    window.basket.shoppingСart.forEach(function (element) {
      if (element.id === buttonTargetSelection) {
        if (element.amount > element.orderedAmount) {
          element.orderedAmount++;
        }
        foundInCart = true;
      }
    });
    if (foundInCart === false) {
      var product = getNewProduct(buttonTargetSelection, window.products[buttonTargetSelection]);
      window.basket.shoppingСart.push(product);
    }
    window.basket.renderCardsInBasket();
  };

  // Удаление товара из корзины
  var buttonClickDelete = function (event) {
    event.preventDefault();
    var buttonGoodsDelete = event.target.id;
    window.basket.shoppingСart.splice(buttonGoodsDelete, 1);
    window.basket.renderCardsInBasket();
  };

  // Уменьшение кол-ва товара
  var decreasetItemCard = function (event) {
    var item = event.target.id;
    if (window.shoppingСart[item].orderedAmount === 1) {
      window.shoppingСart.splice(item, 1);
    } else {
      window.shoppingСart[item].orderedAmount -= 1;
    }
    window.basket.renderCardsInBasket();
  };

  // Увеличение кол-ва товара
  var increasetItemCard = function (event) {
    var item = event.target.id;
    if (window.basket.shoppingСart[item].amount > window.basket.shoppingСart[item].orderedAmount) {
      window.basket.shoppingСart[item].orderedAmount += 1;
    }
    window.basket.renderCardsInBasket();
  };
  window.basket = {
    // Массив для товаров в корзине
    shoppingСart: [],
    renderCardsInBasket: function () {
      var fragment = document.createDocumentFragment();
      window.basket.shoppingСart.forEach(function (element, index) {
        fragment.appendChild(renderItemCardBasket(element, index));
      });
      basketGoods.textContent = ' ';
      basketGoods.appendChild(fragment);
      var cost = countCart(window.basket.shoppingСart);
      basketCount.textContent = 'В корзине товаров: ' + cost[0] + ' на сумму: ' + cost[1] + '₽';
      var submitBtn = document.querySelector('.buy__submit-btn');

      if (window.basket.shoppingСart.length === 0) {
        basketGoods.appendChild(basketGood);
        basketOformlayem.classList.add('visually-hidden');
        submitBtn.disabled = 'disabled';
      } else {
        basketOformlayem.classList.remove('visually-hidden');
        basketOformlayem.querySelector('.goods__total-count').firstChild.textContent = 'ИТОГО ЗА ' + cost[0] + ' ТОВАРОВ:';
        basketOformlayem.querySelector('.goods__price').textContent = cost[1];
        basketOformlayem.querySelector('.goods__order-link').classList.remove('goods_order-link--disabled');
        submitBtn.disabled = '';
      }
    },
    buttonSelectionCollection: function () {
      var buttonProductSelection = goods.querySelectorAll('.card__btn');
      buttonProductSelection.forEach(function (element) {
        element.addEventListener('click', buttonClickSelection);
      });
    }
  };

  window.basket.renderCardsInBasket();
})();

'use strict';

var goods = document.querySelector('.catalog__cards');
document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');
var catalogTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
var numberObjects = 26;

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

var ingredients = [
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
  var someNumber = getRandomInRange(1, 10);
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
var ratingMap = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five'
};

var getRatingGoods = function (value, element) {
  element.classList.add('stars__rating--' + ratingMap[value]);
};

// Функция, возвращающая определеную строку в зависимости от булевого значения
var strokeNutritionFacts = function (array) {
  var strokeSugar = '';
  if (array.nutritionFacts.sugar === true) {
    strokeSugar = 'Содержит сахар';
  }
  strokeSugar = 'Без сахара';
  return strokeSugar;
};

// Функция, генерирующая один продукт
var itemProducts = function (i) {
  var product = {};
  product.name = getRandomItem(names);
  product.picture = 'img/cards/' + getRandomItem(photo) + '.jpg';
  product.amount = i;
  product.price = getRandomInRange(100, 1500);
  product.weight = getRandomInRange(30, 300);
  product.rating = {};
  product.rating.value = getRandomInRange(1, 5);
  product.rating.number = getRandomInRange(1, 900);
  product.nutritionFacts = {};
  product.nutritionFacts.sugar = getRandomBoolean();
  product.nutritionFacts.energy = getRandomInRange(70, 500);
  product.nutritionFacts.contents = getRandomNumberValues(ingredients);
  return product;
};

// Функция, для создания массива из 26 сгенерированных объектов.
// Каждый объект массива представляет собой описание товара
var generatingArrayProducts = function (lengthArray) {
  var arrayProducts = [];
  for (var i = 0; i < lengthArray; i++) {
    arrayProducts[i] = itemProducts(i);
  }
  return arrayProducts;
};

var products = generatingArrayProducts(numberObjects);

// Функция отрисовки карточки необычного товара
var renderItemCard = function (datasCard, id) {
  var goodsElement = catalogTemplate.cloneNode(true);
  goodsElement.querySelector('.card__title').textContent = datasCard.name;
  goodsElement.querySelector('.card__img').src = datasCard.picture;
  goodsElement.querySelector('.card__price').firstChild.textContent = datasCard.price;
  goodsElement.querySelector('.card__weight').textContent = datasCard.weight + 'г';
  var ratingGoods = goodsElement.querySelector('.stars__rating');
  getRatingGoods(datasCard.rating.value, ratingGoods);
  goodsElement.querySelector('.star__count').textContent = '(' + datasCard.rating.number + ')';
  goodsElement.querySelector('.card__characteristic').textContent = strokeNutritionFacts(datasCard);
  goodsElement.querySelector('.card__btn').setAttribute('id', id);
  return goodsElement;
};

var fragment = document.createDocumentFragment();
products.forEach(function (element, index) {
  fragment.appendChild(renderItemCard(element, index));
});
goods.appendChild(fragment);

// Корзина товаров
var basketGoods = document.querySelector('.goods__cards');
var basketGood = basketGoods.querySelector('.goods__card-empty');
basketGoods.classList.remove('goods__cards--empty');
basketGood.classList.add('visually-hidden');

// Добавление выбранного товара в избранное;
var buttonCardFavorite = document.querySelectorAll('.card__btn-favorite');

var buttonClickHandler = function (event) {
  event.preventDefault();
  var buttonTarget = event.target;
  buttonTarget.classList.toggle('card__btn-favorite--selected');
};

buttonCardFavorite.forEach(function (element) {
  element.addEventListener('click', buttonClickHandler);
});

// Добавление выбранного товара в корзину;
var buttonProductSelection = goods.querySelectorAll('.card__btn');
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
    var product = getNewProduct(buttonTargetSelection, products[buttonTargetSelection]);
    shoppingСart.push(product);
  }
  shoppingСart.forEach(function (element) {
    fragment.appendChild(renderItemCard(element));
  });
  basketGoods.textContent = ' ';
  basketGoods.appendChild(fragment);
  var cost = countCart(shoppingСart);
  basketCount.textContent = 'В корзине товаров: ' + cost[0] + ' на сумму: ' + cost[1] + '₽';
};

buttonProductSelection.forEach(function (element) {
  element.addEventListener('click', buttonClickSelection);
});

// Переключение вкладок в форме оформления заказа;
// Переключение блока когда будешь платить?
var payment = document.querySelector('.payment');
var paymentCard = payment.querySelector('.payment__card-wrap');
var paymentCash = payment.querySelector('.payment__cash-wrap');

payment.addEventListener('click', function (evt) {
  if (evt.target.id === 'payment__card') {
    paymentCard.classList.remove('visually-hidden');
    paymentCash.classList.add('visually-hidden');
  } else if (evt.target.id === 'payment__cash') {
    paymentCard.classList.add('visually-hidden');
    paymentCash.classList.remove('visually-hidden');
  }

});

// Переключение вкладок в блоке доставки
var deliver = document.querySelector('.deliver');
var deliverStore = deliver.querySelector('.deliver__store');
var deliverCourier = deliver.querySelector('.deliver__courier');

deliver.addEventListener('click', function (evt) {
  if (evt.target.id === 'deliver__store') {
    deliverStore.classList.remove('visually-hidden');
    deliverCourier.classList.add('visually-hidden');
  } else if (evt.target.id === 'deliver__courier') {
    deliverStore.classList.add('visually-hidden');
    deliverCourier.classList.remove('visually-hidden');
  }
});

// Проверка правильности номера банковской карты
var bankCardstatusMessadge = document.querySelector('.payment__card-status');
var bankCardErrorMessadge = document.querySelector('.payment__error-message');

// Функция, которая проверяет номер по Алгоритму Луна
var checkCardLuna = function (numberCard) {
  var numberCardArray = numberCard.split('');
  var sum = 0;
  for (var i = 0; i < numberCardArray.length; i++) {
    var number = parseInt(numberCardArray[i], 10);
    if (i % 2 === 0) {
      number *= 2;
      if (number > 9) {
        number = 1 + (number % 10);
      }
    }
    sum += number;
  }
  return (sum % 10) === 0;
};

var bankCardInput = document.querySelector('#payment__card-number');

bankCardInput.addEventListener('input', function () {
  if (parseInt(bankCardInput.value, 10) > 0) {
    if (checkCardLuna(bankCardInput.value)) {
      bankCardstatusMessadge.textContent = 'Такая карта существует :)';
      bankCardErrorMessadge.classList.add('visually-hidden');
    } else {
      bankCardErrorMessadge.classList.remove('visually-hidden');
    }
  } else {
    bankCardErrorMessadge.classList.remove('visually-hidden');
  }
});

// Ползунок цен
var catalogFilterRange = document.querySelector('.range');
var leftPin = catalogFilterRange.querySelector('.range__btn--left');
var rightPin = catalogFilterRange.querySelector('.range__btn--right');
var rangeFilter = catalogFilterRange.querySelector('.range__filter');
var range = rangeFilter.clientWidth; // ширина бара фильтра = диапазон
var rangePriceMin = catalogFilterRange.querySelector('.range__price--min');
var rangePriceMax = catalogFilterRange.querySelector('.range__price--max');
var rangeFillLine = catalogFilterRange.querySelector('.range__fill-line');
var priceMin = 10;
var priceMax = 1500;
var pinSize = 10;

// выставим начальные значения пина и бара;
leftPin.style.left = 0;
rightPin.style.right = 0;
rangeFillLine.style.left = (leftPin.offsetLeft) + pinSize + 'px';
rangeFillLine.style.right = pinSize + 'px';
rangePriceMin.textContent = priceMin;
rangePriceMax.textContent = priceMax;

var calculatePrice = function (x) {
  var relativePositionInPercent = Math.round((x * 100) / (range - pinSize)); // вычисляю положение в % от начала
  return Math.round((priceMax - priceMin) * (relativePositionInPercent / 100) + priceMin); // вычисляю цену
};

// обработчик для пина
var onPinMouseDown = function (downEvt) { // при нажатии запоминаем пин и его позицию
  var pin = downEvt.target;
  var pinStart = pin.ofsetfLeft;
  var onPinMouseMove = function (moveEvt) {
    var pinCurrent = pinStart - (downEvt.clientX - moveEvt.clientX); // рассчитываем положение пина по сдвигу мыши и начальному положению
    if (pin === leftPin && pinCurrent >= 0 && pinCurrent < rightPin.offsetLeft) { // если пин левый
      pin.style.left = pinCurrent + 'px';
      rangePriceMin.textContent = calculatePrice(pinCurrent);
      rangeFillLine.style.left = (pinCurrent + 10) + 'px';
    }
    if (pin === rightPin && pinCurrent > leftPin.offsetLeft && pinCurrent <= (range - pinSize)) { // если пин правый
      pin.style.left = pinCurrent + 'px';
      rangePriceMax.textContent = calculatePrice(pinCurrent);
      rangeFillLine.style.right = (range - pinCurrent) + 'px';
    }
  };
  var onPinMouseUp = function () {
    document.removeEventListener('mousemove', onPinMouseMove); // удаляем обработчик "движение мыши"
    document.removeEventListener('mouseup', onPinMouseUp); // удаляем обработчик "отпускание кнопки мыши"
  };
  document.addEventListener('mousemove', onPinMouseMove); // запускаем обработчик "движение мыши"
  document.addEventListener('mouseup', onPinMouseUp); // запускаем обработчик "отпускание кнопки мыши"
};

leftPin.addEventListener('mousedown', onPinMouseDown); // добавляем обработчик "нажатие кнопки мыши" на левый пин
rightPin.addEventListener('mousedown', onPinMouseDown); // добавляем обработчик "нажатие кнопки мыши" на правый пин

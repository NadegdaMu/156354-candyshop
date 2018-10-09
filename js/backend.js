'use strict';

(function () {
  var UrlGet = 'https://js.dump.academy/candyshop/data';
  var UrlPost = 'https://js.dump.academy/candyshop';

  var getXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время запроса в ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 4000;
    return xhr;
  };

  window.backend = {
    loadData: function (onLoad, onError) {
      var xhr = getXhr(onLoad, onError);
      xhr.open('GET', UrlGet);
      xhr.send();
    },

    uploadData: function (data, onLoad, onError) {
      var xhr = getXhr(onLoad, onError);
      xhr.open('POST', UrlPost);
      xhr.send(data);
    }
  };
})();

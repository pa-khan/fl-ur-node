class Alert {
  static interval = null;
  static timeout = 3000;
  static $element = document.querySelector('.alert');
  static $message = Alert.$element.querySelector('.alert__message');
  static $ok = Alert.$element.querySelector('.alert__button');
  static classShow = 'alert_show';
  static types = {
    cartAdd: 'Товар "###" удалён из <a href="/basket.html">корзины</a>',
    cartRemove: 'Товар "###" успешно добавлен в <a href="/basket.html">корзину</a>',
    favoritAdd: 'Товар "###" успешно добавлен в <a href="/favorit.html">избранное</a>',
    favoritRemove: 'Товар "###" удалён из <a href="/favorit.html">избранного</a>',
    compareAdd: 'Товар "###" успешно добавлен в <a href="/compare.html">сравнение</a>',
    compareRemove: 'Товар "###" удалён из <a href="/compare.html">сравнения</a>'
  };
  static push(value, type) {
    let message = '';
    if (type) {
      message = Alert.types[type];
      message = message.replace('###', value);
    } else {
      message = value;
    }

    Alert.$message.innerHTML = message;
    Alert.$element.classList.add(Alert.classShow);

    if (Alert.interval) {
      clearInterval(Alert.interval);
    }
    Alert.interval = setInterval(() => {
      Alert.$element.classList.remove(Alert.classShow);
    }, Alert.timeout);
  }

  static hide() {
    Alert.$element.classList.remove(Alert.classShow);
  }
}

Alert.$ok.addEventListener('click', Alert.hide);
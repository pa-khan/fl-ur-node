'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Field {
  static errorMessages = {
    10: 'Ошибка, поле введено не верно',
    20: 'Ошибка, почта введена не верно.',
    30: 'Ошибка, телефон введен не верно.',
    40: 'Надежный',
    41: 'Не надежный',
    42: 'Нормальный',
  };

  constructor(element) {
    this.element = element;
    this.area = this.element.querySelector('.field__area');
    this.valid = this.element.querySelector('.field__valid');
    this.visible = this.element.querySelector('.field__visible');

    this.classError = 'field_error';
    this.classValid = 'field_valid';
    this.isValid = true;

    this.element.area = this.area;

    if (this.area.value != '') {
      this.element.classList.add(Field.classFilled);
    }

    this.addClassTag();
    this.onFocus();
    this.onInput();

    this.validationType = this.element.getAttribute('data-validation');
    if (this.validationType) {
      this.value = this.area.value;
      if (this.value) {
        this.validation();
      }

      this.area.addEventListener('input', () => {
        this.value = this.area.value;
        this.validation();
      });
    } else {
      this.value = this.area.value;
      if (this.value) {
        this.element.classList.add(this.classValid);
      } else {
        this.element.classList.remove(this.classValid);
      }

      this.area.addEventListener('input', () => {
        this.value = this.area.value;
        if (this.value) {
          this.element.classList.add(this.classValid);
        } else {
          this.element.classList.remove(this.classValid);
        }
      });
    }

    if (this.visible) {
      this.visible.addEventListener('click', () => {
        this.visible.classList.toggle('--show')
        this.area.type = this.area.type == 'password' ? 'text' : 'password';
      });
    }
  }

  validation() {
    this.errorValue = 0;
    switch (this.validationType) {
      case 'name':
        if (this.value.length < 3)
          this.errorValue = 10;
        break;
      case 'email':
        if (!this.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
          this.errorValue = 20;
        break;
      case 'phone':
        if (this.value.length < 18)
          this.errorValue = 30;
        break;
      case 'password':
        if (this.value.length < 6)
          this.errorValue = 41;
        else if (this.value.length >= 6 && this.value.length <= 9)
          this.errorValue = 42;
        else
          this.errorValue = 40;
        break;
    }

    if (this.errorValue >= 40 && this.errorValue <= 49) {
      if (this.errorValue == 40) {
        this.valid.innerHTML = '<div class="field__valid-pass --green"><div class="field__valid-title">' + Field.errorMessages[40] + '</div><div class="field__valid-password"><div></div><div></div><div></div></div></div>';
      } else if (this.errorValue == 41) {
        this.valid.innerHTML = '<div class="field__valid-pass --red"><div class="field__valid-title">' + Field.errorMessages[41] + '</div><div class="field__valid-password"><div></div><div></div><div></div></div></div>';
      } else if (this.errorValue == 42) {
        this.valid.innerHTML = '<div class="field__valid-pass --orange"><div class="field__valid-title">' + Field.errorMessages[42] + '</div><div class="field__valid-password"><div></div><div></div><div></div></div></div>';
      }

      if (this.errorValue > 40) {
        this.isValid = false;
        this.element.classList.remove(this.classValid);
        this.element.classList.add(this.classError);
      } else {
        this.isValid = true;
        this.element.classList.add(this.classValid);
        this.element.classList.remove(this.classError);

      }

      this.valid.style.diplay = 'block';
      console.log(this.valid.style.diplay);
      return false;
    }

    if (this.errorValue != 0) {
      this.isValid = false;
      this.showError(Field.errorMessages[this.errorValue]);
      this.element.classList.remove(this.classValid);
      this.element.classList.add(this.classError);
    } else {
      this.isValid = true;
      this.hideError();
      this.element.classList.add(this.classValid);
      this.element.classList.remove(this.classError);
    }
  }

  showError(text) {
    this.valid.style.diplay = 'block';
    this.valid.innerText = text;
  }

  hideError() {
    this.valid.style.diplay = 'none';
    this.valid.innerText = '';
  }

  addClassTag() {
    this.element.classList.add('--' + this.area.tagName.toLowerCase());
  }

  onFocus() {
    this.element.addEventListener('click', () => {
      this.area.focus();
      this.element.classList.add(Field.classFocus);
    });
    this.element.addEventListener('focusin', () => {
      this.element.classList.add(Field.classFocus);
    });
    this.element.addEventListener('focusout', () => {
      this.element.classList.remove(Field.classFocus);
    });
  }

  onInput() {
    this.area.addEventListener('input', () => {
      if (this.area.value != '') {
        this.element.classList.add(Field.classFilled);
      } else {
        this.element.classList.remove(Field.classFilled);
      }
    });
  }

}

_defineProperty(Field, "classFocus", 'field_focus');

_defineProperty(Field, "classFilled", 'field_filled');

_defineProperty(Field, "classError", 'field_error');
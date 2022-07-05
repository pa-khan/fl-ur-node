'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Check {
  static addError(element, message) {
    element.classList.add(Field.classError);

    if (message) {
      element.querySelector('.check__message').innerText = message;
    }
  }

  constructor(element) {
    this.element = element;
    this.isChecked = false;
    this.input = this.element.querySelector('.check__input');
    this.type = this.input.type;
    this.checkChecked();
    this.onClick();

    this.element.Check = this;
  }

  onClick() {
    this.element.addEventListener('click', () => {
      this.element.classList.remove(Field.classChecked);
      this.element.dispatchEvent(new Event('change'));

      if (this.type == 'checkbox') {
        this.element.classList.toggle(Check.classChecked);
        this.checked = this.input.getAttribute('checked');

        if (this.checked) {
          this.isChecked = false;
          this.input.removeAttribute('checked');
        } else {
          this.isChecked = true;
          this.input.setAttribute('checked', 'checked');
        }

      } else if (this.type == 'radio') {
        if (this.element.closest(Check.classChecked)) {
          return false;
        }

        this.name = this.input.name;
        let parent = this.element.closest('.checks') ? this.element.closest('.checks') : this.element.closest('form') ? this.element.closest('form') : document.body;
        let radios = parent.querySelectorAll('.check input[type="radio"][name="' + this.name + '"]');
        radios.forEach(radio => {
          this.isChecked = false;
          radio.removeAttribute('checked');
          radio.closest('.check').classList.remove(Check.classChecked);
        });

        this.isChecked = true;
        this.element.classList.add(Check.classChecked);
        this.input.setAttribute('checked', 'checked');
      }
    });
  }

  checkChecked() {
    if (this.input.getAttribute('checked')) {
      this.isChecked = true;
      this.element.classList.add(Check.classChecked);
    }
  }

}

_defineProperty(Check, "classChecked", '--checked');

_defineProperty(Check, "classError", '--error');
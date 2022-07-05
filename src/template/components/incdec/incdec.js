class Incdec {
  constructor(element) {
    this.element = element;

    this.buttonPlus = this.element.querySelector('.incdec__button_plus');
    this.buttonMinus = this.element.querySelector('.incdec__button_minus');
    this.input = this.element.querySelector('.incdec__input');
    this.value = Number(this.input.value);
    this.min = 1;
    this.max = 99;


    this.input.addEventListener('input', () => {
      let val = Number(this.input.value.replace(/[\D]/g, ''));

      if (val > this.max) {
        this.value = this.max;
      } else if (val < this.min) {
        this.value = this.min;
      }

      this.input.value = this.value;
    });

    this.buttonPlus.addEventListener('click', () => {
      if (this.value < this.max) {
        this.value++;
      }

      this.input.value = this.value;
    });

    this.buttonMinus.addEventListener('click', () => {
      if (this.value > this.min) {
        this.value--;
      }

      this.input.value = this.value;
    });
  }
}
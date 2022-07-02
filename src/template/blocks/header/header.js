class Header {
  constructor() {
    this.element = document.querySelector('.header');

    if (!this.element) {
      return false;
    }

    window.$header = this.element;
  }
}

new Header();
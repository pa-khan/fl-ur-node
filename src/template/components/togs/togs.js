class Togs {
  constructor(element) {
    this.element = element;

    this.classOpen = 'togs__item_current';
    this.head = this.element.querySelector('.togs__head');

    this.head.addEventListener('click', () => {
      this.element.classList.toggle(this.classOpen);
    })
  }
}
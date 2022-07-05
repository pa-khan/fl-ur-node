class Filter {
  constructor() {
    this.element = document.querySelector('.filter');
    this.toggers = document.querySelectorAll('.filter-toggle');
    this.classShow = 'filter_show';

    if (this.toggers) {
      this.toggers.forEach((toggler) => {
        toggler.addEventListener('click', () => {
          this.element.classList.toggle(this.classShow);
        });
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Filter();
})
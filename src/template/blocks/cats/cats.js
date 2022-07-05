class Cats {
  constructor() {
    this.element = document.querySelector('.cats');
    this.links = this.element.querySelectorAll('.cats__toggle');
    if (!this.element && !this.linkMore) {
      return false;
    }
    this.modal = document.querySelector('.cats__modal');
    this.back = document.querySelector('.cats__back');
    this.classModalShow = 'cats__modal_show';

    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        this.modal.classList.toggle(this.classModalShow);
      });
    })


  }
}

new Cats();
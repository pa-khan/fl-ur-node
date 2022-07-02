class Lkp {
  constructor() {
    this.element = document.querySelector('.lkp');

    if (!this.element) {
      return false;
    }

    this.isOpen = false;

    this.classOpen = 'lkp_open';

    this.element.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      this.element.classList.toggle(this.classOpen);
    });

    document.addEventListener('click', (event) => {
      if (this.isOpen && !event.target.closest('.lkp')) {
        this.isOpen = false;
        this.element.classList.remove(this.classOpen);
      }
    });

  }
}

new Lkp();
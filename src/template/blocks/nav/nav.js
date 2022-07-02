class Nav {
  constructor() {
    this.element = document.querySelector('.nav');

    if (!this.element) {
      return false;
    }

    this.isOpen = false;
    this.classShow = 'nav_show';
    this.classBodyShow = 'body-nav-open';
    this.classItemCurrent = 'nav__item_current';
    this.items = this.element.querySelectorAll('.nav__item')
    this.currentItem = null;


    if (this.items) {
      this.items.forEach((item) => {
        item.sub = item.querySelector('.nav__sub');
        if (item.sub) {
          item.link = item.querySelector('.nav__item-link');
          item.link.addEventListener('click', (event) => {
            event.preventDefault();

            this.setCurrent(item);
          })
        }
      })

    }

    document.addEventListener('DOMContentLoaded', () => {
      this.toggleButtons = document.querySelectorAll('.toggler-nav');
      if (this.toggleButtons) {
        this.toggleButtons.forEach((button) => {
          button.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            this.element.classList.toggle(this.classShow);
            document.body.classList.toggle(this.classBodyShow);
          });
        })
      }
    });
  }

  setCurrent(item) {
    if (this.currentItem) {
      this.currentItem.classList.remove(this.classItemCurrent);
    }

    this.currentItem = item;
    this.currentItem.classList.add(this.classItemCurrent);
  }
}

new Nav();
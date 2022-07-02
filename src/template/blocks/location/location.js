class Location {
  constructor() {
    this.element = document.querySelector('.location');

    if (!this.element) {
      return false;
    }

    this.items = this.element.querySelectorAll('.location__item');
    this.value = this.element.querySelector('.location__value');
    this.isOpen = false;

    this.classOpen = 'location_open';
    this.classItemCurrent = 'location__item_current';

    this.setCurrent(this.items[0]);

    this.element.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      this.element.classList.toggle(this.classOpen);
    });

    this.items.forEach((item) => {
      item.addEventListener('click', () => {
        this.setCurrent(item);
      });
    });

    document.addEventListener('click', (event) => {
      if (this.isOpen && !event.target.closest('.location')) {
        this.isOpen = false;
        this.element.classList.remove(this.classOpen);
      }
    });

  }

  setCurrent(item) {
    if (this.currentItem) {
      this.currentItem.classList.remove(this.classItemCurrent);
    }

    this.currentItem = item;
    this.currentItem.classList.add(this.classItemCurrent);
    this.value.innerHTML = item.innerHTML;
  }
}

new Location();
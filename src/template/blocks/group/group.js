class Group {
  constructor(element) {
    this.element = element;

    if (!this.element) {
      return false;
    }

    document.addEventListener('DOMContentLoaded', () => {
      this.sliders = document.querySelectorAll('.group__slider');
      if (this.sliders.length > 0) {
        this.sliders.forEach((slider) => {
          new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 20
          });
        })
      }
    })
  }
}

new Group(document.querySelector('.group'));
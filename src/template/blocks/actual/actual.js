class Actual {
  constructor(element) {
    this.element = element;

    if (!this.element) {
      return false;
    }

    document.addEventListener('DOMContentLoaded', () => {
      this.sliders = document.querySelectorAll('.actual__slider');
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

new Actual(document.querySelector('.actual'));
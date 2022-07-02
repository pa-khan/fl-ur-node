class Intro {
  constructor() {
    this.element = document.querySelector('.intro');

    if (!this.element) {
      return false;
    }

    this.slider = this.element.querySelector('.intro__slides')
    this.pagination = this.element.querySelector('.intro__pagination')
    if (this.slider) {
      document.addEventListener('DOMContentLoaded', () => {
        new Swiper(this.slider, {
          autoplay: true,
          loop: true,
          loopAdditionalSlides: 1,
          pagination: {
            el: this.pagination,
            clickable: true
          },
        });
      })
    }
  }
}

new Intro();
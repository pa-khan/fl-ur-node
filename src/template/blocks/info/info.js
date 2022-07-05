document.addEventListener('DOMContentLoaded', () => {


  let infoSlider = document.querySelector('.info__slider'),
    infoPagination = document.querySelector('.info__pagination');

  let infoSwiperPagination = new Swiper(infoPagination, {
    slidesPerView: 'auto',
    spaceBetween: 10,
  });

  new Swiper(infoSlider, {
    loop: true,
    loopAdditionalSlides: 1,
    thumbs: {
      swiper: infoSwiperPagination
    },
  });

});
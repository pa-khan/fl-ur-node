document.addEventListener('DOMContentLoaded', () => {
  let parnershipsSliders = document.querySelectorAll('.partnership__block-slider');
  if (parnershipsSliders) {
    parnershipsSliders.forEach((slider) => {
      new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 27
      });
    })
  }

  let parnershipsSelect = document.querySelector('.partnership__choiser-select select');
  let parnershipsBlocks = document.querySelectorAll('.partnership__block');
  if (parnershipsSelect && parnershipsBlocks) {
    parnershipsSelect.addEventListener('change', () => {
      parnershipsBlocks.forEach((block) => {
        if (block.dataset.value == parnershipsSelect.querySelector('option[selected]').value) {
          block.style.display = 'block';
        } else {
          block.style.display = 'none';
        }
      });
    });
  }
});



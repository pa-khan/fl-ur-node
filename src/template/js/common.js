var html = document.querySelector('html'),
		body = document.querySelector('body'),
		wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', ()=>{
  wrap.style.minHeight = html.clientHeight + 'px';
  window.addEventListener('resize', ()=>{
    wrap.style.minHeight = html.clientHeight + 'px';
  });

  let fields = document.querySelectorAll('.field');
  if (fields) {
    fields.forEach((field)=>{
      field.area = field.querySelector('input');
      if (!field.area) {
        field.area = field.querySelector('textarea');
      }

      field.area.addEventListener('focusin', ()=>{
        field.classList.remove('--error');
      });

    });
  }


  let counter = document.querySelector('.counter');
  let startBtn = document.getElementById('start-btn');
  let startBtnPulse = startBtn.querySelector('.pulse');
  let startElClick = document.querySelector('.start__click');

  if (counter) {
    counter.val = counter.querySelector('.counter__value');
    counter.end = counter.getAttribute('data-end');
    counter.end = Date.parse(counter.end);

    interval();
    counter.interval = setInterval(()=>{
      interval();
    }, 1000);

    function interval() {
      counter.start = Date.now();
      counter.diff = counter.end - counter.start;
      counter.diff = new Date(counter.diff);

      if (counter.diff < new Date(0)) {
        counter.val.innerHTML = '— — —';
        // startBtnPlay.classList.add('--hide');
        // startBtnStop.classList.remove('--hide');

        startBtn.classList.add('--has-click');
        startBtnPulse.classList.add('--play');
        startElClick.classList.add('--show');
        clearInterval(interval);
        return false;
      }

      counter.days  = counter.diff.getUTCDate() - 1;

      counter.hours = (counter.days * 24) + counter.diff.getUTCHours();
      counter.hours = counter.hours < 10 ? "0" + counter.hours : counter.hours;

      counter.minutes = counter.diff.getUTCMinutes();
      counter.minutes = counter.minutes < 10 ? "0" + counter.minutes : counter.minutes;

      counter.seconds = counter.diff.getUTCSeconds();
      counter.seconds = counter.seconds < 10 ? "0" + counter.seconds : counter.seconds;

      counter.val.innerHTML = counter.hours + ':' + counter.minutes + ':' + counter.seconds;
    }

  }

  startBtn.addEventListener('click', ()=>{
    startBtn.classList.toggle('--stop');
  });

  let fmBtn  = document.querySelector('.fm__btn'),
      fmForm = document.querySelector('.fm__form'),
      fmBg   = document.querySelector('.fm__bg');
      fomSuccessful = document.querySelector('.form__successful');

  fmBtn.addEventListener('click', ()=>{
    fmForm.classList.add('--show');
    fmBg.classList.add('--show');
  });

  fmBg.addEventListener('click', ()=>{
    fmForm.classList.remove('--show');
    fmBg.classList.remove('--show');
  });

  fmFormFieldsRequired = fmForm.querySelectorAll('.field.--required');
  fmForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    let errors = 0;
    fmFormFieldsRequired.forEach((field)=>{
      console.log(field)
      if (field.area.value == '') {
        field.classList.add('--error');
        errors++;
      }
    });

    if (errors == 0) {
      // XHR here
      fomSuccessful.classList.add('--show');
    }

  });
});

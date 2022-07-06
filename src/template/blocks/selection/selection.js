let selection = document.querySelector('.selection');
if (selection) {
  selectionAuto = selection.querySelectorAll('.auto__select');
  if (selectionAuto) {
    selectionAuto.forEach(select => {
      select.addEventListener('click', () => {
        if (document.body.offsetWidth >= 768) {
          selection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      })
    });
  }
}
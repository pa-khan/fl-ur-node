class Myauto {
  constructor() {
    this.items = document.querySelectorAll('.myauto__item');
    this.filterItemToggle = document.querySelector('.filter__item_auto');
    this.buttonToggle = document.querySelector('.myauto__button-add');
    this.choiser = document.querySelector('.myauto__choiser');

    if (this.items.length > 0) {
      this.items.forEach((item) => {
        item.addEventListener('change', () => {
          setTimeout(() => {
            if (item.Check.isChecked) {
              this.filterItemToggle.style.display = 'none';
            } else {
              this.filterItemToggle.style.display = 'block';
            }
          })
        })
      })
    }

    if (this.buttonToggle) {

      this.choiser.style.display = 'none';
      this.buttonToggle.addEventListener('click', () => {
        if (!this.choiserShow) {
          this.choiser.style.display = 'block';
        } else {
          this.choiser.style.display = 'none';
        }
        this.choiserShow = !this.choiserShow;
      });


    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Myauto();
});
class Search {
  constructor() {
    this.element = document.querySelector('.search');

    if (!this.element) {
      return false;
    }

    this.isOpen = false;
    this.classShow = 'search_show';
    this.classHeaderSearchShow = 'header_search-show';
    this.element.field = this.element.querySelector('.search__field');

    document.addEventListener('DOMContentLoaded', () => {
      this.toggleButtons = document.querySelectorAll('.toggler-search');
      if (this.toggleButtons) {
        this.toggleButtons.forEach((button) => {
          button.addEventListener('click', () => {
            this.toggleOpen();
          });
        })
      }
    });

  }

  toggleOpen() {

    this.isOpen = !this.isOpen;
    this.element.classList.toggle(this.classShow);

    if (window.$header) {
      window.$header.classList.toggle(this.classHeaderSearchShow);
    }
  }
}

new Search();
class Product {
  constructor(element) {
    this.element = element;

    if (!this.element) {
      return false;
    }

    this.isAdded = false;
    this.isFavorit = false;
    this.isCompare = false;
    this.buttonAdd = this.element.querySelector('.product__button-add');
    this.buttonFavorit = this.element.querySelector('.product__button-favorit');
    this.buttonCompare = this.element.querySelector('.product__button-comp');
    this.buttonRemove = this.element.querySelector('.product__button-remove');
    this.modal = this.element.querySelector('.product__modal');
    this.incdec = this.element.querySelector('.product__incdec');
    this.classButtonAddAdded = 'product__button-add_added';
    this.classButtonFavoritAdded = 'product__button-favorit_added';
    this.classButtonCompareAdded = 'product__button-comp_added';

    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.nk')) {
        event.preventDefault();
      }
    });

    if (this.buttonAdd) {
      if (this.buttonAdd.classList.contains(this.classButtonAddAdded)) {
        this.isAdded = true;
      }
      this.buttonAdd.addEventListener('click', () => {
        if (this.isAdded) {
          this.removeCart();

          return false;
        }
        if (this.modal && window.Popup) {
          Popup.show(this.modal);

          return false;
        }

        this.addCart();
      });
    }

    if (this.buttonFavorit) {
      if (this.buttonFavorit.classList.contains(this.classButtonFavoritAdded)) {
        this.isFavorit = true;
      }
      this.buttonFavorit.addEventListener('click', () => {
        if (this.isFavorit) {
          this.removeFavorit();

          return false;
        }

        this.addFavorit();
      });
    }

    if (this.buttonCompare) {
      if (this.buttonCompare.classList.contains(this.classButtonCompareAdded)) {
        this.isCompare = true;
      }
      this.buttonCompare.addEventListener('click', () => {
        if (this.isCompare) {
          this.removeCompare();

          return false;
        }

        this.addCompare();
      });
    }


    if (this.modal && window.Popup) {
      this.buttonAddSets = this.element.querySelector('.product__sets-button');
      this.sets = this.element.querySelector('.product__sets-list');
      this.setsError = this.element.querySelector('.product__sets-error');

      this.buttonAddSets.addEventListener('click', () => {
        setTimeout(() => {
          if (this.sets.querySelector('.form__sets-item.--checked')) {
            this.setsError.style.display = 'none';
            this.addCart();
            Popup.close();
          } else {
            this.setsError.style.display = 'block';
          }
        }, 100);
      });
    }

    if (this.incdec) {
      new Incdec(this.incdec);
    }

    if (this.buttonRemove) {
      this.buttonRemove.addEventListener('click', () => {
        this.element.remove();
      })
    }

    this.element.Product = this;
  }

  addCart() {
    this.buttonAdd.classList.add(this.classButtonAddAdded);
    this.isAdded = true;
  }

  removeCart() {
    this.buttonAdd.classList.remove(this.classButtonAddAdded);
    this.isAdded = false;
  }

  addFavorit() {
    this.buttonFavorit.classList.add(this.classButtonFavoritAdded);
    this.isFavorit = true;
  }

  removeFavorit() {
    this.buttonFavorit.classList.remove(this.classButtonFavoritAdded);
    this.isFavorit = false;
  }

  addCompare() {
    this.buttonCompare.classList.add(this.classButtonCompareAdded);
    this.isCompare = true;
  }

  removeCompare() {
    this.buttonCompare.classList.remove(this.classButtonCompareAdded);
    this.isCompare = false;
  }
}

new Product();
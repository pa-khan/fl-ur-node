class Card {
  constructor(element) {
    this.element = element;

    if (!this.element) {
      return false;
    }

    this.isAdded = false;
    this.isFavorit = false;
    this.isCompare = false;
    this.title = this.element.querySelector('.card__name').innerText;
    this.buttonAdd = this.element.querySelector('.card__button-add');
    this.buttonAddText = this.buttonAdd.querySelector('.button__text');
    this.buttonAddCall = this.buttonAdd.querySelector('.card__button-feedback');
    this.buttonAddFavorit = this.buttonAdd.querySelector('.card__button-favorit');
    this.buttonFavorit = this.element.querySelector('.card__action_favorit');
    this.buttonCompare = this.element.querySelector('.card__action_compare');
    this.modalFeedback = document.getElementById('modal-feedback');
    this.modalReport = document.getElementById('modal-report');
    this.slider = this.element.querySelector('.card__images');
    this.pagination = this.element.querySelector('.card__pagination');
    this.selections = this.element.querySelectorAll('.card__selection');
    this.classActionSelected = 'card__action_selected';
    this.classButtonFavoritSelected = 'card__button-favorit_selected';


    this.buttonAdd.addEventListener('click', (event) => {
      if (event.target.closest('.card__button-feedback')) {
        Popup.show(this.modalFeedback);

        return false;
      }

      if (event.target.closest('.card__button-favorit')) {
        if (!this.isFavorit) {
          this.addFavorit();
        } else {
          this.removeFavorit();
        }

        return false;
      }

      if (this.buttonAdd.classList.contains('card__button-report')) {
        Popup.show(this.modalReport);

        return false;
      }

      if (this.isAdded) {
        window.location.href = '/basket.html';

        return false;
      }

      this.addCart();
    });

    this.buttonFavorit.addEventListener('click', (event) => {
      if (!this.isFavorit) {
        this.addFavorit();
      } else {
        this.removeFavorit();
      }
    });

    this.buttonCompare.addEventListener('click', (event) => {
      if (!this.isCompare) {
        this.addCompare();
      } else {
        this.removeCompare();
      }
    });

    if (this.buttonAddFavorit) {
      this.buttonAddFavorit.addEventListener('click', (event) => {
        if (!this.isFavorit) {
          this.addFavorit();
        } else {
          this.removeFavorit();
        }
      });
    }

    this.swiperPagination = new Swiper(this.pagination, {
      slidesPerView: 'auto',
      spaceBetween: 10,
    });

    this.swiperSlider = new Swiper(this.slider, {
      thumbs: {
        swiper: this.swiperPagination
      },
    });

    this.initSelections();

    this.element.Card = this;
  }

  addCart() {
    Alert.push(this.title, 'cartAdd');
    this.buttonAdd.classList.add(this.classButtonAddAdded);
    this.isAdded = true;
    this.buttonAddText.innerText = 'Перейти в корзину';
    this.buttonAddCall.style.display = 'none';
  }


  removeCart() {
    Alert.push(this.title, 'cartRemove');
    this.buttonAdd.classList.remove(this.classButtonAddAdded);
    this.isAdded = false;
  }

  addFavorit() {
    Alert.push(this.title, 'favoritAdd');
    this.buttonFavorit.classList.add(this.classActionSelected);
    if (this.buttonAddFavorit) {
      this.buttonAddFavorit.classList.add(this.classButtonFavoritSelected);
    }
    this.isFavorit = true;
  }

  removeFavorit() {
    Alert.push(this.title, 'favoritRemove');
    this.buttonFavorit.classList.remove(this.classActionSelected);
    if (this.buttonAddFavorit) {
      this.buttonAddFavorit.classList.remove(this.classButtonFavoritSelected);
    }
    this.isFavorit = false;
  }

  addCompare() {
    Alert.push(this.title, 'compareAdd');
    this.buttonCompare.classList.add(this.classActionSelected);
    this.isCompare = true;
  }

  removeCompare() {
    Alert.push(this.title, 'compareRemove');
    this.buttonCompare.classList.remove(this.classActionSelected);
    this.isCompare = false;
  }


  async getSelectionList(url = '') {
    if (!url) {
      return false;
    }

    const response = await fetch(url);
    if (response.ok) {
      this.selectionsJSON = await response.json();
    }
  }
  async initSelections() {
    await this.getSelectionList('autos.json');

    this.selections.forEach((selection) => {
      selection.step = 1;

      selection.marks = selection.querySelector('.card__selection-list_marks');
      selection.models = selection.querySelector('.card__selection-list_models');
      selection.mods = selection.querySelector('.card__selection-list_mods');
      selection.return = selection.querySelector('.card__selection-return');

      selection.current = {
        marks: null,
        models: null,
        mods: null
      }

      selection.marks.style.display = 'block';
      selection.models.style.display = 'none';
      selection.mods.style.display = 'none';
      selection.return.style.display = 'none';

      selection.return.addEventListener('click', () => {
        this.prevSelectionLevel(selection);
      });

      this.selectionsJSON.forEach((mark) => {
        let markDiv = this.createSelectionItem(mark.value, mark.icon, '<div class="card__selection-plus"></div>', selection.marks, mark.models);
        markDiv.addEventListener('click', () => {
          selection.current.marks = mark;
          this.nextSelectionLevel(selection)
        });

        mark.models.forEach((model) => {
          let modelDiv = this.createSelectionItem(model.value, mark.icon, '<svg class="icon icon_arrow"><use xlink:href="#icon-arrow"></use></svg>', selection.models, model.mods);
          modelDiv.parentEl = mark;

          modelDiv.addEventListener('click', () => {
            selection.current.models = model;
            this.nextSelectionLevel(selection)
          });

          model.mods.forEach((mode) => {
            let modeDiv = this.createSelectionItem(mode.value, mark.icon, '', selection.mods);
            modeDiv.parentEl = model;
          });
        });
      });
    });
  }
  getModelWord(value = 0) {
    let text = '';

    if (value == 0) {
      text = 'Для всех моделей';
      return text;
    } else if (value == 1) {
      text = 'модель';
    } else if (value >= 2 && value <= 4) {
      text = 'модели';
    } else {
      text = 'моделей';
    }

    return value + ' ' + text;
  }
  createSelectionItem(name, mark, icon, list, child) {
    let div = document.createElement('div');
    div.className = 'card__selection-item';
    div.innerHTML = `
        <div class="card__selection-mark"><img src="" alt=""></div>
        <div class="card__selection-name"></div>
        <div class="card__selection-count"></div>
        <div class="card__selection-icon"></div>`;

    div.elMarkImg = div.querySelector('.card__selection-mark img');
    div.elName = div.querySelector('.card__selection-name');
    div.elCount = div.querySelector('.card__selection-count');
    div.elIcon = div.querySelector('.card__selection-icon');
    div.elIcon.innerHTML = icon;

    div.elMarkImg.src = mark;
    div.elName.innerText = name;

    if (child) {
      div.elCount.innerText = this.getModelWord(child.length);
    } else {
      div.elCount.innerText = 'Все модели';
      div.elIcon.style.display = 'none';
    }

    if (!icon) {
      div.elCount.style.display = 'none';
    }

    list.append(div);

    return div;
  }

  nextSelectionLevel(selection) {
    selection.step++;

    this.swithSelectionLevel(selection, true);
  }

  prevSelectionLevel(selection) {
    selection.step--;

    this.swithSelectionLevel(selection, true);
  }
  swithSelectionLevel(selection, filter = false) {
    switch (selection.step) {
      case 1:
        selection.marks.style.display = 'block';
        selection.models.style.display = 'none';
        selection.mods.style.display = 'none';
        selection.return.style.display = 'none';
        break;
      case 2:
        selection.marks.style.display = 'none';
        selection.models.style.display = 'block';
        selection.mods.style.display = 'none';
        selection.return.style.display = 'flex';

        this.filterSelectionList(selection, 'models', 'marks');
        break;
      case 3:
        selection.marks.style.display = 'none';
        selection.models.style.display = 'none';
        selection.mods.style.display = 'block';
        selection.return.style.display = 'flex';

        this.filterSelectionList(selection, 'mods', 'models');
        break;
    }
  }

  filterSelectionList(selection, list, parent) {

    for (let item of selection[list].children) {
      if (item.parentEl == selection.current[parent]) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let card = document.querySelector('.card');
  new Card(card);
});
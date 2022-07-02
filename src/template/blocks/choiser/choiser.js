document.addEventListener('DOMContentLoaded', async () => {
  class Choiser {
    static list = [];
    static current = {
      mark: null,
      model: null,
      mode: null,
    };

    static lists = {
      marks: document.getElementById('choiser-marks'),
      models: document.getElementById('choiser-models'),
      mods: document.getElementById('choiser-mods')
    };

    static block = document.getElementById('choiser');
    static autos = document.getElementById('choiser-autos');
    static empty = document.getElementById('choiser-empty');
    static button = document.getElementById('choiser-button');
    static buttonText = document.querySelector('#choiser-button .button__text')
    static classItem = 'choiser__item';
    static classItemCurrent = 'choiser__item_current';
    static classModalShow = 'choiser__modal_show';
    static classAutosHide = 'choiser__autos_hide';
    static classEmptyHide = 'choiser__empty_hide';

    static buttonTexts = {
      next: 'Продолжить',
      skip: 'Пропустить',
      reset: 'Сбросить'
    };

    static step = 1;
    static area = Choiser.block.querySelector('.choiser__field');
    static modal = Choiser.block.querySelector('.choiser__modal');
    static back = Choiser.block.querySelector('.choiser__back');
    static search = Choiser.block.querySelector('.choiser__search');
    static async getList(url = '') {
      if (!url) {
        return false;
      }

      const response = await fetch(url);
      if (response.ok) {
        Choiser.list = await response.json();
      }
    }

    static toggleShow() {
      Choiser.modal.classList.toggle(Choiser.classModalShow);
    }
    static goBack() {
      if (Choiser.step == 1) {
        Choiser.toggleShow();
        return false;
      }

      console.log(Choiser.step)
      switch (Choiser.step) {
        case 2:
          Choiser.clearList('mark', Choiser.lists.models);
          break;
        case 3:
          Choiser.clearList('model', Choiser.lists.mods, Choiser.current.mark.item);
          break;
      }
      Choiser.hideEmpty();
      Choiser.search.classList.remove('field_filled');
      Choiser.search.area.value = '';
      Choiser.step--;
      Choiser.buttonText.innerText = Choiser.step == 1 ? Choiser.buttonTexts.next : Choiser.buttonTexts.skip;
    }

    static sepItems() {
      const searchList = Choiser.current.model ? Choiser.lists.mods :
        Choiser.current.mark ? Choiser.lists.models :
          Choiser.lists.marks;
      const searchValue = Choiser.search.area.value.toLowerCase();
      let elemsIndex = 0;

      for (let item of searchList.children) {
        if (searchValue && item.el.title.innerText.toLowerCase().indexOf(searchValue) < 0) {
          item.style.display = 'none';
        } else {
          item.removeAttribute('style');
          elemsIndex++;
        }
      }

      if (searchValue) {
        Choiser.buttonText.innerText = Choiser.buttonTexts.reset;
      } else {
        Choiser.buttonText.innerText = Choiser.step == 1 ? Choiser.buttonTexts.next : Choiser.buttonTexts.skip;
      }

      if (elemsIndex == 0) {
        Choiser.showEmpty();
      } else {
        Choiser.hideEmpty();
      }
    }

    static showEmpty() {
      Choiser.autos.classList.add(Choiser.classAutosHide);
      Choiser.empty.classList.remove(Choiser.classEmptyHide);
    }

    static hideEmpty() {
      Choiser.autos.classList.remove(Choiser.classAutosHide);
      Choiser.empty.classList.add(Choiser.classEmptyHide);
    }

    static clearList(current, list, showItem) {
      Choiser.current[current].item.classList.remove(Choiser.classItemCurrent);
      for (let item of Choiser.current[current].item.parentList.children) {
        item.removeAttribute('style');
      }
      Choiser.current[current] = null;
      if (list) {
        list.innerHTML = '';
      }
      if (showItem) {
        showItem.removeAttribute('style');
      }
    }

    static renderList(array = [], list = [], current = '', callbackClick) {
      Choiser.search.classList.remove('field_filled');
      Choiser.search.area.value = '';
      Choiser.hideEmpty();
      if (array.length > 0) {
        array.forEach(el => {
          const icon = el.icon ? el.icon : Choiser.current.mark.icon;
          const item = Choiser.createElement(el.value, icon);
          item.parentList = list;

          item.addEventListener('click', () => {
            const findElement = array.find(el => el.value == item.el.title.innerText);
            Choiser.current[current] = findElement;
            Choiser.current[current].item = item;
            Choiser.step++;
            Choiser.buttonText.innerText = Choiser.buttonTexts.skip;
            if (callbackClick) {
              callbackClick();
            }
          });

          list.append(item);
        });
      }
    }

    static createElement(value = '', icon = '') {
      const div = document.createElement('div')
      div.className = Choiser.classItem;
      div.innerHTML = `<div class="choiser__item-icon"><img src="" alt=""></div>
      <div class="choiser__item-title"></div>
      <div class="choiser__item-arrow">
        <svg class="icon icon_arrow">
          <use xlink:href="#icon-arrow"></use>
        </svg>
      </div>`;

      div.el = {
        icon: div.querySelector('.choiser__item-icon img'),
        title: div.querySelector('.choiser__item-title'),
      };

      div.el.icon.src = icon;
      div.el.title.innerHTML = value;

      div.addEventListener('click', () => {
        if (div.parentList) {
          const items = document.querySelectorAll('.choiser__item');
          items.forEach((item) => {
            if (item != div) {
              item.style.display = 'none';
            } else {
              item.classList.add(Choiser.classItemCurrent);
            }
          });
        }
      });

      return div;
    }

    static renderListMarks() {
      Choiser.renderList(Choiser.list, Choiser.lists.marks, 'mark', Choiser.renderListModels);
    }
    static renderListModels() {
      Choiser.renderList(Choiser.current.mark.models, Choiser.lists.models, 'model', Choiser.renderListMods);
    }
    static renderListMods() {
      Choiser.renderList(Choiser.current.model.mods, Choiser.lists.mods, 'mode', Choiser.toCatalog);
    }
    static toCatalog() {
      window.location.href = '/catalog.html';
    }
    static buttonClick() {
      if (Choiser.search.area.value) {
        Choiser.search.classList.remove('field_filled');
        Choiser.search.area.value = '';
        Choiser.hideEmpty();
        Choiser.sepItems();

        return false;
      }

      // if (Choiser.step > 1) {
      Choiser.toCatalog();
      // }
    }
  }


  await Choiser.getList('autos.json');

  Choiser.renderListMarks();
  Choiser.area.addEventListener('click', () => {
    Choiser.toggleShow();
  });
  Choiser.back.addEventListener('click', () => {
    Choiser.goBack();
  });

  Choiser.search.area.addEventListener('input', Choiser.sepItems);
  Choiser.button.addEventListener('click', Choiser.buttonClick);

});
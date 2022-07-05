class Select {
  constructor(element) {
    this.element = element;

    if (!this.element) {
      return false;
    }

    this.value = null;

    this.isValid = true;
    this.classOpen = 'select_open';
    this.classFilled = 'select_filled';
    this.classHasIcon = 'select_has-icon';
    this.classPlaceholder = 'select__placeholder';
    this.classItem = 'select__item';
    this.classItemCurrent = 'select__item_current';
    this.classItemTitle = 'select__item-title';
    this.classItemCheck = 'select__item-check';
    this.classItemIcon = 'select__item-icon';
    this.placeholder = this.element.dataset.placeholder;

    this.$el = {
      value: this.element.querySelector('.select__value'),
      icon: this.element.querySelector('.select__icon'),
      iconImg: document.createElement('img'),
      list: this.element.querySelector('.select__list'),
      clear: this.element.querySelector('.select__clear'),
      select: this.element.querySelector('select'),
      options: this.element.querySelectorAll('option'),
      items: []
    };

    this.$el.icon.append(this.$el.iconImg);
    this.isValid = this.findOptions();

    this.setPlaceholderValue();
    this.addPlaceholderClass();


    this.element.addEventListener('click', (event) => {
      if (this.isValid && !event.target.closest('.select__clear')) {
        this.element.classList.toggle(this.classOpen);
      }
    });


    if (this.$el.options) {
      this.$el.options.forEach(option => {
        this.createItem(option);
      });
    }

    if (this.$el.clear) {
      this.$el.clear.addEventListener('click', () => {
        this.setDefaultValue();
        this.$el.select.dispatchEvent(new Event('clear'));
      })
    }

    this.element.Select = this;
  }

  renderOptions(arrayOptions = []) {
    if (arrayOptions.length == 0) {
      return false
    }

    this.$el.options = [];
    this.$el.select.innerHTML = '';

    if (this.value) {
      this.removeValue();
    }

    arrayOptions.forEach((itemOption) => {
      const option = document.createElement('option');
      option.value = option.innerText = itemOption.value;

      if (itemOption.icon) {
        option.setAttribute('data-icon', itemOption.icon);
      }

      this.$el.select.append(option);
    });

    this.isValid = this.findOptions();

    if (this.isValid) {
      this.$el.options.forEach(option => {
        this.createItem(option);
      });
    }

  }

  findOptions() {
    this.$el.options = this.element.querySelectorAll('option');

    if (this.$el.options.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  setPlaceholderValue() {
    this.$el.value.innerText = this.placeholder;
  }

  addPlaceholderClass() {
    this.$el.value.classList.add(this.classPlaceholder);
  }

  removePlaceholderClass() {
    this.$el.value.classList.remove(this.classPlaceholder);
  }

  changeItem() {
    this.$el.select.dispatchEvent(new Event('change'));
  }
  createItem(option) {
    const item = document.createElement('div');
    const itemTitle = document.createElement('div');
    const itemCheck = document.createElement('div');

    option.selectItem = item;
    item.elOption = option;
    item.className = this.classItem;

    if (option.dataset.icon) {
      const itemIcon = document.createElement('div');
      const itemIconImg = document.createElement('img');

      itemIcon.className = this.classItemIcon;
      itemIconImg.src = option.dataset.icon;
      itemIcon.append(itemIconImg);

      item.append(itemIcon);
    }

    itemTitle.innerText = option.innerText;
    itemTitle.className = this.classItemTitle;
    item.append(itemTitle);

    itemCheck.innerHTML = '<svg class="icon icon_check"><use xlink:href="#icon-check"></use></svg>';
    itemCheck.className = this.classItemCheck;
    item.append(itemCheck);


    item.addEventListener('click', () => {
      if (this.value != option) {
        this.setValue(option);
      }
    });

    this.$el.items.push(item);
    this.$el.list.append(item);
  }

  setValue(option) {
    if (this.value) {
      this.removeValue();
    }

    this.value = option;
    this.value.setAttribute('selected', 'selected');
    this.value.selectItem.classList.add(this.classItemCurrent);
    this.$el.value.innerText = this.value.innerText;

    if (option?.dataset?.icon) {
      this.$el.iconImg.src = option.dataset.icon;
      this.element.classList.add(this.classHasIcon);
    } else {
      this.$el.iconImg.src = '';
      this.element.classList.remove(this.classHasIcon);
    }

    this.$el.value.classList.remove(this.classPlaceholder);
    this.element.classList.add(this.classFilled);
    this.changeItem();

    this.isValid = true;
    this.$el.select.dispatchEvent(new Event('setValue'));
  }

  removeValue() {
    if (this.value) {
      this.value.removeAttribute('selected');
      this.value.selectItem.classList.remove(this.classItemCurrent);
      this.value = null;
    }
    this.$el.select.value = '';
    this.changeItem();
    this.$el.select.dispatchEvent(new Event('removeValue'));
  }

  setDefaultValue() {
    this.removeValue();

    this.setPlaceholderValue();
    this.addPlaceholderClass();
    this.$el.iconImg.src = '';
    this.element.classList.remove(this.classHasIcon);
    this.element.classList.remove(this.classFilled);
  }

  removeItems() {
    if (this.$el.options?.length > 0) {
      this.$el.options.forEach((option) => {
        option.remove();
      });
    }
    if (this.$el.items?.length > 0) {
      this.$el.items.forEach((item) => {
        item.remove();
      });
    }

    this.setDefaultValue();
    this.isValid = this.findOptions();
  }
}
class File {
  constructor(element) {
    this.element = element;

    if (!this.element) {
      return false;
    }

    this.list = this.element.querySelector('.file__list');
    this.input = this.element.querySelector('.file__input');


    this.input.addEventListener('change', () => {
      this.list.innerHTML = '';
      this.value = Array.from(this.input.files);

      for (let file of this.value) {
        this.addFile(file.name);
      }

      // this.addFile()
    });

  }

  addFile(name = '') {
    let file = document.createElement('div');
    file.className = 'file__item';
    file.innerHTML = '<div class="file__item-name"></div><div class="file__item-remove"></div>';
    file.elName = file.querySelector('.file__item-name');
    file.elRemove = file.querySelector('.file__item-remove');

    file.elName.innerHTML = name;
    file.elRemove.addEventListener('click', () => {
      file.remove();
    });
    this.list.append(file);

    file
  }
}

const files = document.querySelectorAll('.file');
if (files) {
  files.forEach((file) => {
    new File(file);
  });
}
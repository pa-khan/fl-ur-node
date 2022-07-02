document.addEventListener('DOMContentLoaded', async () => {
  class Auto {
    static classSelectError = 'auto__select_error';
    static list = [];
    static current = {
      mark: null,
      model: null,
      mode: null,
    };

    static block = document.getElementById('auto')

    static select = {
      mark: document.getElementById('auto-mark'),
      model: document.getElementById('auto-model'),
      mode: document.getElementById('auto-mode'),
    };

    static async getList(url = '') {

      if (!url) {
        return false;
      }

      const response = await fetch(url);
      if (response.ok) {
        Auto.list = await response.json();
      }
    }
    static setError(select) {
      select.classList.add(Auto.classSelectError);
      setTimeout(() => {
        select.classList.remove(Auto.classSelectError);
      }, 3000);
    }

    static sctollToBlock() {
      if (document.body >= 768) {
        this.block.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  await Auto.getList('autos.json');
  Auto.select.mark.Select.renderOptions(Auto.list);
  Auto.select.mark.Select.$el.select.addEventListener('setValue', () => {
    const value = Auto.select.mark.Select.$el.select.value;
    const findElement = Auto.list.find(el => el.value == value);
    Auto.current.mark = findElement;
    Auto.select.model.Select.renderOptions(Auto.current.mark.models);
  });

  Auto.select.mark.Select.$el.select.addEventListener('clear', () => {
    Auto.select.model.Select.removeItems();
    Auto.select.mode.Select.removeItems();
  });

  Auto.select.model.Select.$el.select.addEventListener('setValue', () => {
    const value = Auto.select.model.Select.$el.select.value;
    const findElement = Auto.current.mark.models.find(el => el.value == value);
    Auto.current.model = findElement;
    Auto.select.mode.Select.renderOptions(Auto.current.model.mods);
  });

  Auto.select.model.Select.$el.select.addEventListener('clear', () => {
    Auto.select.mode.Select.removeItems();
  });

  Auto.select.model.Select.element.addEventListener('click', () => {
    if (!Auto.select.model.Select.isValid) {
      Auto.setError(Auto.select.mark);
    }
  });

  Auto.select.mode.Select.element.addEventListener('click', () => {
    if (!Auto.select.model.Select.isValid) {
      Auto.setError(Auto.select.mark);
      return false;
    }
    if (!Auto.select.mode.Select.isValid) {
      Auto.setError(Auto.select.model);
    }
  });
});
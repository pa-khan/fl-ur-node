class Tabs {
  constructor(element) {
    this.element = element;

    if (!this.element) {
      return false;
    }
    this.current = {
      link: null,
      tab: null
    };

    this.classCurrentLink = this.element.dataset.currentLink;
    this.classCurrentTab = this.element.dataset.currentTab;

    this.links = this.element.querySelectorAll('.tabs__link');
    if (this.links.length > 0) {
      this.links.forEach(link => {
        link.el = document.getElementById(link.dataset.el);

        if (link.classList.contains(this.classCurrent)) {
          this.setCurrent(link);
        }

        link.addEventListener('click', () => {
          if (link != this.current.link) {
            this.setCurrent(link);
          }
        });
      });

      if (!this.current.link) {
        this.setCurrent(this.links[0])
      }
    }

  }

  setCurrent(link) {
    if (this.current.link && this.current.tab) {
      this.removeCurrent();
    }

    this.current.link = link;
    this.current.tab = this.current.link.el;

    this.current.link.classList.add(this.classCurrentLink);
    this.current.tab.classList.add(this.classCurrentTab);
  }
  removeCurrent() {
    this.current.link.classList.remove(this.classCurrentLink);
    this.current.tab.classList.remove(this.classCurrentTab);
  }
}
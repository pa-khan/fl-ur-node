document.addEventListener('DOMContentLoaded', () => {


  ymaps.ready(() => {
    let map;
    map = new ymaps.Map('map', {
      center: [59.904645, 30.284921],
      zoom: 13,
      controls: []
    }, {
      searchControlProvider: 'yandex#search'
    })

    let placemark = new ymaps.Placemark([59.904645, 30.284921], {}, {});

    map.geoObjects.add(placemark);
    map.behaviors.disable('scrollZoom');
  });
});
var html = document.querySelector('html'),
	body = document.querySelector('body'),
	wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', () => {
	const fields = document.querySelectorAll('.field');
	if (fields) {
		fields.forEach((field) => {
			new Field(field);

			if (field.getAttribute('data-validation') == 'phone') {
				IMask(field.area, {
					mask: '+{7} (000) 000-00-00'
				})
			}
		});
	}

	const selects = document.querySelectorAll('.select');
	if (selects) {
		selects.forEach((select) => {
			new Select(select);
		})
	}

	const tabs = document.querySelectorAll('.tabs');
	if (selects) {
		tabs.forEach((tabsItem) => {
			new Tabs(tabsItem);
		})
	}

	const ranges = document.querySelectorAll('.range');
	if (ranges) {
		ranges.forEach((range) => {
			range.prefix = range.dataset.prefix;
			range.min = Number(range.dataset.min);
			range.max = Number(range.dataset.max);
			range.start = range.dataset.start.split(', ');
			range.start = range.start.map((el) => {
				return Number(el)
			});
			range.inner = range.querySelector('.range__inner');
			range.valueFrom = range.querySelector('.range__value_from');
			range.valueTo = range.querySelector('.range__value_to');

			let slider = noUiSlider.create(range.inner, {
				start: range.start,
				connect: true,
				step: 1,
				range: {
					'min': range.min,
					'max': range.max
				},
			});

			slider.on('update', (v) => {
				range.valueFrom.innerHTML = Number(v[0]).toLocaleString('ru') + ' <span class="r"></span>';
				range.valueTo.innerHTML = Number(v[1]).toLocaleString('ru') + ' <span class="r"></span>';
			});

		});
	}


	const checks = document.querySelectorAll('.check');

	if (checks) {
		checks.forEach((check) => {
			new Check(check);
		});
	}

	window.Popup = new Popup();


	const products = document.querySelectorAll('.product');
	if (products) {
		products.forEach((product) => {
			new Product(product);
		});
	}

	const togs = document.querySelectorAll('.togs__item');
	if (togs.length > 0) {
		togs.forEach((tog) => {
			new Togs(tog);
		})
	}

	let forms = document.querySelectorAll('.form');
	let modalThanks = document.getElementById('modal-thanks');
	if (forms.length > 0) {
		forms.forEach((form) => {
			form.btn = form.querySelector('.form__button');

			if (form.btn) {
				form.btn.addEventListener('click', () => {
					Popup.close();

					setTimeout(() => {
						Popup.show(modalThanks);
					}, 100);
				});
			}

		});
	}
});

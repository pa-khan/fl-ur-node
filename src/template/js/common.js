var html = document.querySelector('html'),
	body = document.querySelector('body'),
	wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', () => {
	const fields = document.querySelectorAll('.field');
	if (fields) {
		fields.forEach((field) => {
			new Field(field);
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


});

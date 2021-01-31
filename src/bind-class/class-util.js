// From https://github.com/vuejs/vue/blob/265dd457789bf726f95dd0578c1ce65a8b6ae9fd/src/platforms/web/runtime/class-util.js

function addClass(element, classes) {
	if (classes.length === 0) {
		return;
	}

	const { classList } = element;

	return classes.filter((_class) => {
		if (!classList.contains(_class)) {
			classList.add(_class);
			return true;
		}
		return false;
	});
}

function removeClass(element, classes) {
	if (!classes || classes.length === 0) {
		return;
	}

	let _class;
	while (_class = classes.shift()) {
		element.classList.remove(_class);
	}

	if (element.classList.length === 0) {
		element.removeAttribute('class');
	}
}

export {
	addClass,
	removeClass,
};

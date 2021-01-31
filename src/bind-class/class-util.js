// From https://github.com/vuejs/vue/blob/265dd457789bf726f95dd0578c1ce65a8b6ae9fd/src/platforms/web/runtime/class-util.js

export function addClass(el, classes) {
	if (!classes.length) {
		return;
	}

	const { classList } = el;

	return classes.filter((c) => {
		if (!classList.contains(c)) {
			classList.add(c);
			return true;
		}
	});
}

export function removeClass(el, classes) {
	if (!classes || !classes.length) {
		return;
	}

	let c;
	while (c = classes.shift()) {
		el.classList.remove(c);
	}

	if (!el.classList.length) {
		el.removeAttribute('class');
	}
}

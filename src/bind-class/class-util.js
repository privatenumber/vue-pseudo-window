// From https://github.com/vuejs/vue/blob/265dd457789bf726f95dd0578c1ce65a8b6ae9fd/src/platforms/web/runtime/class-util.js
/* eslint-disable */

const whitespaceRE = /\s+/;

export function addClass(el, cls) {
	if (!cls || !(cls = cls.trim())) {
		return;
	}

	const classes = cls.split(whitespaceRE);
	const { classList } = el;

	return classes.filter((c) => {
		if (!classList.contains(c)) {
			classList.add(c);
			return true;
		}
	});
}

export function removeClass(el, classes) {
	if (!classes.length) {
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

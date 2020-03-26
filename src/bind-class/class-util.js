// From https://github.com/vuejs/vue/blob/265dd457789bf726f95dd0578c1ce65a8b6ae9fd/src/platforms/web/runtime/class-util.js
/* eslint-disable */

const whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
export function addClass(el, cls) {
	if (!cls || !(cls = cls.trim())) {
		return;
	}

	if (el.classList) {
		if (cls.indexOf(' ') > -1) {
			cls.split(whitespaceRE).forEach((c) => el.classList.add(c));
		} else {
			el.classList.add(cls);
		}
	} else {
		const cur = ` ${el.getAttribute('class') || ''} `;
		if (cur.indexOf(` ${cls} `) < 0) {
			el.setAttribute('class', (cur + cls).trim());
		}
	}
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
export function removeClass(el, cls) {
	if (!cls || !(cls = cls.trim())) {
		return;
	}

	if (el.classList) {
		if (cls.indexOf(' ') > -1) {
			cls.split(whitespaceRE).forEach((c) => el.classList.remove(c));
		} else {
			el.classList.remove(cls);
		}
		if (!el.classList.length) {
			el.removeAttribute('class');
		}
	} else {
		let cur = ` ${el.getAttribute('class') || ''} `;
		const tar = ` ${cls} `;
		while (cur.indexOf(tar) >= 0) {
			cur = cur.replace(tar, ' ');
		}
		cur = cur.trim();
		if (cur) {
			el.setAttribute('class', cur);
		} else {
			el.removeAttribute('class');
		}
	}
}

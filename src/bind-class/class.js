// From https://github.com/vuejs/vue/blob/531371b818b0e31a989a06df43789728f23dc4e8/src/platforms/web/util/class.js
/* eslint-disable */

const isObject = (obj) => obj !== null && typeof obj === 'object';

const flatMap = (arr, f) => arr.reduce((acc, e) => acc.concat(f(e)), []);

function stringifyObject(value) {
	let res = [];
	for (const key in value) {
		if (value[key]) {
			res.push(key);
		}
	}
	return res;
}

export function stringifyClass(value) {
	if (Array.isArray(value)) {
		return flatMap(value, v => stringifyClass(v))
	}
	if (isObject(value)) {
		return stringifyObject(value);
	}
	if (typeof value === 'string' && value) {
		return [value];
	}
	return [];
};

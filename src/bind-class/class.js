// From https://github.com/vuejs/vue/blob/531371b818b0e31a989a06df43789728f23dc4e8/src/platforms/web/util/class.js
/* eslint-disable */

function isDef(v) {
	return v !== undefined && v !== null;
}

function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}

function concat(a, b) {
	return a ? b ? (`${a} ${b}`) : a : (b || '');
}

function stringifyClass(value) {
	if (Array.isArray(value)) {
		return stringifyArray(value);
	}
	if (isObject(value)) {
		return stringifyObject(value);
	}
	if (typeof value === 'string') {
		return value;
	}
	return '';
}

function stringifyArray(value) {
	let res = '';
	let stringified;
	for (let i = 0, l = value.length; i < l; i++) {
		if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
			if (res) res += ' ';
			res += stringified;
		}
	}
	return res;
}

function stringifyObject(value) {
	let res = '';
	for (const key in value) {
		if (value[key]) {
			if (res) res += ' ';
			res += key;
		}
	}
	return res;
}

export function renderClass(
  staticClass,
  dynamicClass,
) {
	if (isDef(staticClass) || isDef(dynamicClass)) {
		return concat(staticClass, stringifyClass(dynamicClass));
	}
	return '';
}

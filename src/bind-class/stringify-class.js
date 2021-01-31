// From https://github.com/vuejs/vue/blob/531371b818b0e31a989a06df43789728f23dc4e8/src/platforms/web/util/class.js

const isObject = object => object !== null && typeof object === 'object';

// eslint-disable-next-line unicorn/no-reduce
const flatMap = (array, callback) => array.reduce(
	(accumulator, element) => accumulator.concat(callback(element)),
	[],
);

function stringifyObject(object) {
	const truthyKeys = [];
	for (const key in object) {
		if (object[key]) {
			truthyKeys.push(key);
		}
	}
	return truthyKeys;
}

export default function stringifyClass(value) {
	if (Array.isArray(value)) {
		return flatMap(value, v => stringifyClass(v));
	}
	if (isObject(value)) {
		return stringifyObject(value);
	}
	if (typeof value === 'string' && value) {
		return [value];
	}
	return [];
}

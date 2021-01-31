import stringifyClass from './stringify-class.js';
import { addClass, removeClass } from './class-util.js';

const getTarget = ({ body, document }) => {
	if (body) {
		return window.document.body;
	}
	if (document) {
		return window.document.documentElement;
	}
	return false;
};

export default ({ props, data, parent }) => {
	const classesString = stringifyClass([data.staticClass, data.class]);
	if (!classesString) {
		return;
	}

	const target = getTarget(props);
	if (!target) {
		return;
	}

	const added = addClass(target, classesString);
	const off = () => { removeClass(target, added); };
	parent.$once('hook:beforeUpdate', off);
	parent.$once('hook:destroyed', off);
};

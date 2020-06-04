import { stringifyClass } from './class';
import { addClass, removeClass } from './class-util';

const getTarget = ({ body, document }) => {
	if (body) { return window.document.body; }
	if (document) { return window.document.documentElement; }
	return false;
};

export default ({ props, data, parent }) => {
	const classStr = stringifyClass([data.staticClass, data.class]);
	if (!classStr) { return; }

	const target = getTarget(props);
	if (!target) { return; }

	const added = addClass(target, classStr);
	const off = () => { removeClass(target, added); };
	parent.$once('hook:beforeUpdate', off);
	parent.$once('hook:destroyed', off);
};

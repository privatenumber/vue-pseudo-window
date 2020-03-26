import { stringifyClass } from './class';
import { addClass, removeClass } from './class-util';

const BODY = typeof window !== 'undefined' && window.document.body;

export default ({ data, parent }) => {
	const classStr = stringifyClass([data.staticClass, data.class]);
	if (!classStr) { return; }

	const added = addClass(BODY, classStr);
	const off = () => { removeClass(BODY, added); };
	parent.$once('hook:beforeUpdate', off);
	parent.$once('hook:destroyed', off);
};

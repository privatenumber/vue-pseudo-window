import { renderClass } from './class';
import { addClass, removeClass } from './class-util';

const BODY = typeof window !== 'undefined' && window.document.body;

export default ({ data, parent }) => {
	const classStr = renderClass(data.staticClass, data.class);
	if (!classStr) { return; }

	addClass(BODY, classStr);

	const off = () => { removeClass(BODY, classStr); };
	parent.$once('hook:beforeUpdate', off);
	parent.$once('hook:destroyed', off);
};

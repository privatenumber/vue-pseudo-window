const { hasOwnProperty } = Object.prototype;
const hasOwn = (obj, prop) => hasOwnProperty.call(obj, prop);

// From: https://github.com/vuejs/vue/blob/b00868c/src/core/vdom/helpers/update-listeners.js#L14
const normalizeEvent = (M_target, M_name, M_handler) => {
	const passive = M_name[0] === '&';
	M_name = passive ? M_name.slice(1) : M_name; // eslint-disable-line no-param-reassign

	const once = M_name[0] === '~'; // Prefixed last, checked first
	M_name = once ? M_name.slice(1) : M_name; // eslint-disable-line no-param-reassign

	const capture = M_name[0] === '!';
	M_name = capture ? M_name.slice(1) : M_name; // eslint-disable-line no-param-reassign

	return {
		M_target,
		M_name,
		M_handler,
		M_opts: {
			once,
			capture,
			passive,
		},
	};
};

const unbindEventListeners = (handlers) => {
	let e;
	while (e = handlers.shift()) { // eslint-disable-line no-cond-assign
		e.M_target.removeEventListener(e.M_name, e.M_handler, e.M_opts);
	}
};

const bindEventListners = (element, $listeners) => {
	const handlers = [];
	for (const eventName in $listeners) {
		if (!hasOwn($listeners, eventName)) { continue; }
		const eventHandler = $listeners[eventName];
		const e = /* @__PURE__ */normalizeEvent(
			element,
			eventName,
			eventHandler,
		);
		e.M_target.addEventListener(e.M_name, e.M_handler, e.M_opts);
		handlers.push(e);
	}
	return handlers;
};

const getTarget = ({ props }) => {
	if (props.body) { return window.document.body; }
	if (props.document) { return window.document; }
	return window;
};

export default (ctx) => {
	const handlers = bindEventListners(
		getTarget(ctx),
		ctx.listeners,
	);

	const off = () => { unbindEventListeners(handlers); };
	ctx.parent.$once('hook:beforeUpdate', off);
	ctx.parent.$once('hook:destroyed', off);
};

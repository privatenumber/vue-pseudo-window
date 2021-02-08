const { hasOwnProperty } = Object.prototype;
const hasOwn = (object, property) => hasOwnProperty.call(object, property);

// From: https://github.com/vuejs/vue/blob/b00868c/src/core/vdom/helpers/update-listeners.js#L14
const normalizeEvent = (target, name, handler) => {
	const passive = name[0] === '&';
	name = passive ? name.slice(1) : name;

	const once = name[0] === '~'; // Prefixed last, checked first
	name = once ? name.slice(1) : name;

	const capture = name[0] === '!';
	name = capture ? name.slice(1) : name;

	return {
		target,
		name,
		handler,
		opts: {
			once,
			capture,
			passive,
		},
	};
};

const unbindEventListeners = (handlers) => {
	let eventHandler;
	while (eventHandler = handlers.shift()) { // eslint-disable-line no-cond-assign
		eventHandler.target.removeEventListener(
			eventHandler.name,
			eventHandler.handler,
			eventHandler.opts,
		);
	}
};

const bindEventListners = (element, $listeners) => {
	const handlers = [];
	for (const eventName in $listeners) {
		if (!hasOwn($listeners, eventName)) {
			continue;
		}
		const eventHandler = $listeners[eventName];
		const event = /* @__PURE__ */normalizeEvent(
			element,
			eventName,
			eventHandler,
		);
		event.target.addEventListener(event.name, event.handler, event.opts);
		handlers.push(event);
	}
	return handlers;
};

const getTarget = ({ body, document }) => {
	if (body) {
		return window.document.body;
	}
	if (document) {
		return window.document;
	}
	return window;
};

export default ({ props, listeners, parent }) => {
	const handlers = bindEventListners(
		getTarget(props),
		listeners,
	);

	const off = () => {
		unbindEventListeners(handlers);
	};
	parent.$once('hook:beforeUpdate', off);
	parent.$once('hook:destroyed', off);
};

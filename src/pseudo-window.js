const { hasOwnProperty } = Object.prototype;
const hasOwn = (obj, prop) => hasOwnProperty.call(obj, prop);

// From: https://github.com/vuejs/vue/blob/6fe07ebf5ab3fea1860c59fe7cdd2ec1b760f9b0/src/core/vdom/helpers/update-listeners.js#L14
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

const bindEventListners = ($listeners, element, handlers) => {
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
};

const unbindEventListeners = (handlers, notTarget) => handlers.filter((e) => {
	if (notTarget === e.M_target) {
		return true;
	}

	e.M_target.removeEventListener(e.M_name, e.M_handler, e.M_opts);
	return false;
});

export default {
	name: 'pseudo-window',

	props: {
		document: Boolean,
		body: Boolean,
	},

	render() {
		const defSlot = this.$slots.default;
		return defSlot && defSlot.length === 1 ? defSlot[0] : defSlot;
	},

	data() {
		return { M_handlers: [] };
	},

	computed: {
		target() {
			if (this.body) { return window.document.body; }
			if (this.document) { return window.document; }
			return window;
		},
	},

	mounted() {
		bindEventListners(
			this.$listeners,
			this.target,
			this.M_handlers,
		);

		this.$watch(() => this.target, (target) => {
			this.M_handlers = unbindEventListeners(this.M_handlers, target);
			bindEventListners(
				this.$listeners,
				target,
				this.M_handlers,
			);
		});
	},

	destroyed() {
		unbindEventListeners(this.M_handlers);
	},
};

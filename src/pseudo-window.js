// https://github.com/vuejs/vue/blob/6fe07ebf5ab3fea1860c59fe7cdd2ec1b760f9b0/src/core/vdom/helpers/update-listeners.js#L14
const normalizeEvent = (target, rawName, handler) => {
	let name = rawName;

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

const { hasOwnProperty } = Object;
const hasOwn = (obj, prop) => hasOwnProperty.call(obj, prop);

export default {
	name: 'pseudo-window',

	props: {
		document: Boolean,
	},

	render() {
		const defSlot = this.$slots.default;
		return defSlot && defSlot.length === 1 ? defSlot[0] : defSlot;
	},

	data() {
		return { handlers: [] };
	},

	mounted() {
		// Bind events
		for (const $k in this.$listeners) {
			if (!hasOwn(this.$listeners, $k)) { continue; }
			const $v = this.$listeners[$k];
			const e = normalizeEvent(
				this.document ? window.document : window,
				$k, // event name
				$v, // event handler
			);
			e.target.addEventListener(e.name, e.handler, e.opts);
			this.handlers.push(e);
		}
	},

	destroyed() {
		// Unbind events
		while (this.handlers.length) {
			const e = this.handlers.shift();
			e.target.removeEventListener(e.name, e.handler, e.opts);
		}
	},
};

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
		return { M_handlers: [] };
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
			e.M_target.addEventListener(e.M_name, e.M_handler, e.M_opts);
			this.M_handlers.push(e);
		}
	},

	destroyed() {
		// Unbind events
		while (this.M_handlers.length) {
			const e = this.M_handlers.shift();
			e.M_target.removeEventListener(e.M_name, e.M_handler, e.M_opts);
		}
	},
};

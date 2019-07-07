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
		Object.entries(this.$listeners).forEach(($l) => {
			const e = this.normalizeEvent(
				this.document ? window.document : window,
				$l[0], // event name
				$l[1], // event handler
			);
			e.target.addEventListener(e.name, e.handler, e.opts);
			this.handlers.push(e);
		});
	},

	destroyed() {
		// Unbind events
		while (this.handlers.length) {
			const e = this.handlers.shift();
			e.target.removeEventListener(e.name, e.handler, e.opts);
		}
	},

	methods: {
		// https://github.com/vuejs/vue/blob/6fe07ebf5ab3fea1860c59fe7cdd2ec1b760f9b0/src/core/vdom/helpers/update-listeners.js#L14
		normalizeEvent(target, rawName, handler) {
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
		},
	},
};

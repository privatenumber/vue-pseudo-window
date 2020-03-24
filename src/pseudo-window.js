import { bindEventListners, unbindEventListeners } from './utils';

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

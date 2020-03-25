import { bindEventListners, unbindEventListeners } from './utils';

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

	computed: {
		M_target() {
			return this.document ? window.document : window;
		},
	},

	mounted() {
		this.$watch(
			() => this.M_target,
			(target) => {
				unbindEventListeners(this.M_handlers);
				this.M_handlers = [];

				bindEventListners(
					this.$listeners,
					target,
					this.M_handlers,
				);
			},
			{ immediate: true },
		);
	},

	destroyed() {
		unbindEventListeners(this.M_handlers);
	},
};

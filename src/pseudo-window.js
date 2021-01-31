import bindClass from './bind-class/index.js';
import bindEventListeners from './bind-event-listeners.js';

const init = (context) => {
	bindEventListeners(context);
	bindClass(context);
};

export default {
	name: 'pseudo-window',

	functional: true,

	props: {
		document: Boolean,
		body: Boolean,
	},

	render(h, context) {
		if (context.parent._isMounted) {
			init(context);
		} else {
			context.parent.$once('hook:mounted', () => {
				init(context);
			});
		}

		return context.slots().default;
	},
};

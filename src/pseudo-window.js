import bindClass from './bind-class/index';
import bindEventListeners from './bind-event-listeners';

const init = (ctx) => {
	bindEventListeners(ctx);

	if (ctx.props.body) {
		bindClass(ctx);
	}
};

export default {
	name: 'pseudo-window',

	functional: true,

	props: {
		document: Boolean,
		body: Boolean,
	},

	render(h, ctx) {
		if (ctx.parent._isMounted) { // eslint-disable-line no-underscore-dangle
			init(ctx);
		} else {
			ctx.parent.$once('hook:mounted', () => {
				init(ctx);
			});
		}

		return ctx.slots().default;
	},
};

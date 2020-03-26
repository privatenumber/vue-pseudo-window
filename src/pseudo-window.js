import bindEventListners from './bind-event-listeners';

const addEventListeners = (ctx) => {
	const unbindEventListeners = bindEventListners(
		ctx.props.document ? window.document : window,
		ctx.listeners,
	);

	ctx.parent.$once('hook:beforeUpdate', unbindEventListeners);
	ctx.parent.$once('hook:destroyed', unbindEventListeners);
};

export default {
	name: 'pseudo-window',

	functional: true,

	props: {
		document: Boolean,
	},

	render(h, ctx) {
		if (ctx.parent._isMounted) { // eslint-disable-line no-underscore-dangle
			addEventListeners(ctx);
		} else {
			ctx.parent.$once('hook:mounted', () => {
				addEventListeners(ctx);
			});
		}

		return ctx.slots().default;
	},
};

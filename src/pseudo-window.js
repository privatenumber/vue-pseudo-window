import bindEventListners from './bind-event-listeners';

const addEventListeners = ({ props, listeners, parent }) => {
	const unbindEventListeners = bindEventListners(
		props.document ? window.document : window,
		listeners,
	);

	parent.$once('hook:beforeUpdate', unbindEventListeners);
	parent.$once('hook:destroyed', unbindEventListeners);
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

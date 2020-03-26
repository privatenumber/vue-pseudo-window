import { mount } from '@vue/test-utils';
import PseudoWindow from 'vue-pseudo-window';

describe('Slot', () => {
	it('pass through nothing', () => {
		const wrapper = mount({
			template: '<pseudo-window />',
			components: {
				PseudoWindow,
			},
		});

		expect(wrapper.html()).toBe('');
	});

	it('pass through one element', () => {
		const wrapper = mount({
			template: '<pseudo-window><div>Hello world</div></pseudo-window>',
			components: {
				PseudoWindow,
			},
		});

		expect(wrapper.html()).toBe('<div>Hello world</div>');
	});

	it('pass through multiple children', () => {
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window>
						<div>Hello world</div>
						<div>Hello world</div>
					</pseudo-window>
				</div>
			`,
			components: {
				PseudoWindow,
			},
		});
		expect(wrapper.html()).toBe('<div>\n  <div>Hello world</div>\n  <div>Hello world</div>\n</div>');
	});
});

describe('Window', () => {
	it('should catch "click" event', () => {
		const clickHandler = jest.fn();
		mount({
			template: `
				<div>
					<pseudo-window
						@click="clickHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				clickHandler,
			},
		}, {
			attachToDocument: true,
		});

		global.window.dispatchEvent(new Event('click'));
		expect(clickHandler).toBeCalled();
	});

	it('should catch "resize" event', () => {
		const resizeHandler = jest.fn();
		mount({
			template: `
				<div>
					<pseudo-window
						@resize="resizeHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				resizeHandler,
			},
		}, {
			attachToDocument: true,
		});

		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler).toBeCalled();
	});

	it('should cleanup event handler and not catch "resize" event', () => {
		const resizeHandler = jest.fn();
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						@resize="resizeHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				resizeHandler,
			},
		}, {
			attachToDocument: true,
		});

		wrapper.destroy();

		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler).not.toBeCalled();
	});

	it('should catch "resize" event once', () => {
		const resizeHandler = jest.fn();
		mount({
			template: `
				<div>
					<pseudo-window
						@~resize="resizeHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				resizeHandler,
			},
		}, {
			attachToDocument: true,
		});

		global.window.dispatchEvent(new Event('resize'));
		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler.mock.calls.length).toBe(1);
	});
});

describe('Document', () => {
	it('should not catch "resize" on window', () => {
		const resizeHandler = jest.fn();
		mount({
			template: `
				<div>
					<pseudo-window
						document
						@resize="resizeHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				resizeHandler,
			},
		}, {
			attachToDocument: true,
		});

		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler).not.toHaveBeenCalled();
	});

	it('should catch "click" on document', () => {
		const clickHandler = jest.fn();
		mount({
			template: `
				<div>
					<pseudo-window
						document
						@click="clickHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				clickHandler,
			},
		}, {
			attachToDocument: true,
		});

		global.window.document.dispatchEvent(new Event('click'));
		expect(clickHandler).toHaveBeenCalled();
	});

	it('swithc from window to document to window', async () => {
		const clickHandler = jest.fn();
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						:document="document"
						@click="clickHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			data() {
				return {
					document: false,
				};
			},
			methods: {
				clickHandler,
			},
		}, {
			attachToDocument: true,
		});

		global.window.dispatchEvent(new Event('click'));
		expect(clickHandler).toHaveBeenCalled();

		wrapper.setData({ document: true });
		await wrapper.vm.$nextTick();

		global.window.dispatchEvent(new Event('click'));
		expect(clickHandler.mock.calls.length).toBe(1);

		global.window.document.dispatchEvent(new Event('click'));
		expect(clickHandler.mock.calls.length).toBe(2);

		wrapper.setData({ document: false });
		await wrapper.vm.$nextTick();

		global.window.document.dispatchEvent(new Event('click'));
		expect(clickHandler.mock.calls.length).toBe(2);

		global.window.dispatchEvent(new Event('click'));
		expect(clickHandler.mock.calls.length).toBe(3);
	});
});

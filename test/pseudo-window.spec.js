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
	beforeEach(() => {
		const div = document.createElement('div');
		div.id = 'app';
		global.window.document.body.append(div);
	});

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
		}, { attachTo: '#app' });

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
		}, { attachTo: '#app' });

		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler).toBeCalled();
	});

	it('should cleanup after destroy', () => {
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
		}, { attachTo: '#app' });

		wrapper.destroy();

		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler).not.toBeCalled();
	});

	it('should cleanup after v-if="false"', async () => {
		const resizeHandler = jest.fn();
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						v-if="handle"
						@resize="resizeHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			data() {
				return {
					handle: true,
				};
			},
			methods: {
				resizeHandler,
			},
		}, { attachTo: '#app' });

		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler.mock.calls.length).toBe(1);

		wrapper.setData({ handle: false });
		await wrapper.vm.$nextTick();

		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler.mock.calls.length).toBe(1);

		wrapper.setData({ handle: true });
		await wrapper.vm.$nextTick();

		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler.mock.calls.length).toBe(2);
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
		}, { attachTo: '#app' });

		global.window.dispatchEvent(new Event('resize'));
		global.window.dispatchEvent(new Event('resize'));
		expect(resizeHandler.mock.calls.length).toBe(1);
	});
});

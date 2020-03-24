import Vue from 'vue';
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

	it('should warn on multiple children', () => {
		const warnHandler = jest.fn();
		Vue.config.warnHandler = warnHandler;
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
		expect(wrapper.html()).toBe('<div>\n  <!---->\n</div>');
		expect(warnHandler).toBeCalled();
	});
});

describe('Window', () => {
	it('should not catch "click" event', () => {
		const myMockFn = jest.fn();
		mount(PseudoWindow, {
			attachToDocument: true,
		});

		global.window.dispatchEvent(new Event('click'));
		expect(myMockFn).not.toBeCalled();
	});

	it('should catch "resize" event', () => {
		const myMockFn = jest.fn();
		mount(PseudoWindow, {
			attachToDocument: true,
			listeners: {
				resize: myMockFn,
			},
		});

		global.window.dispatchEvent(new Event('resize'));
		expect(myMockFn).toBeCalled();
	});

	it('should cleanup event handler and not catch "resize" event', () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
			attachToDocument: true,
			listeners: {
				resize: myMockFn,
			},
		});

		wrapper.destroy();

		global.window.dispatchEvent(new Event('resize'));
		expect(myMockFn).not.toHaveBeenCalled();
	});

	it('should catch "resize" event once', () => {
		const myMockFn = jest.fn();
		mount(PseudoWindow, {
			attachToDocument: true,
			listeners: {
				'~resize': myMockFn,
			},
		});

		global.window.dispatchEvent(new Event('resize'));
		global.window.dispatchEvent(new Event('resize'));
		expect(myMockFn.mock.calls.length).toBe(1);
	});

	it('should not catch "resize" event', () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
			attachToDocument: true,
			listeners: {
				'~resize': myMockFn,
			},
		});

		wrapper.destroy();

		global.window.dispatchEvent(new Event('resize'));
		expect(myMockFn).not.toBeCalled();
	});
});

describe('Document', () => {
	it('should not catch "resize" on window', () => {
		const myMockFn = jest.fn();
		mount(PseudoWindow, {
			attachToDocument: true,
			propsData: {
				document: true,
			},
			listeners: {
				resize: myMockFn,
			},
		});

		global.window.dispatchEvent(new Event('resize'));

		expect(myMockFn).not.toHaveBeenCalled();
	});

	it('should catch "click" on document', () => {
		const myMockFn = jest.fn();
		mount(PseudoWindow, {
			attachToDocument: true,
			propsData: {
				document: true,
			},
			listeners: {
				click: myMockFn,
			},
		});

		global.window.document.dispatchEvent(new Event('click'));

		expect(myMockFn).toHaveBeenCalled();
	});


	it('should not catch window event', () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
			attachToDocument: true,
			propsData: {
				document: true,
			},
			listeners: {
				click: myMockFn,
			},
		});

		wrapper.setProps({ document: true });

		global.window.dispatchEvent(new Event('click'));
		expect(myMockFn).not.toHaveBeenCalled();
	});

	it('Switch from window to document', async () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
			attachToDocument: true,
			listeners: {
				click: myMockFn,
			},
		});

		wrapper.setProps({ document: true });
		await wrapper.vm.$nextTick();

		global.window.dispatchEvent(new Event('click'));
		expect(myMockFn).not.toHaveBeenCalled();

		global.window.document.dispatchEvent(new Event('click'));
		expect(myMockFn).toHaveBeenCalled();
	});

	it('Switch from document to window', async () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
			attachToDocument: true,
			propsData: {
				document: true,
			},
			listeners: {
				click: myMockFn,
			},
		});

		global.window.document.dispatchEvent(new Event('click'));
		expect(myMockFn.mock.calls.length).toBe(1);

		wrapper.setProps({ document: false });
		await wrapper.vm.$nextTick();

		global.window.document.dispatchEvent(new Event('click'));
		global.window.dispatchEvent(new Event('click'));
		expect(myMockFn.mock.calls.length).toBe(2);
	});

	it('Switch from document to window to document', async () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
			attachToDocument: true,
			propsData: {
				document: true,
			},
			listeners: {
				click: myMockFn,
			},
		});

		global.window.document.dispatchEvent(new Event('click'));
		expect(myMockFn.mock.calls.length).toBe(1);

		wrapper.setProps({ document: false });
		await wrapper.vm.$nextTick();

		global.window.document.dispatchEvent(new Event('click'));
		global.window.dispatchEvent(new Event('click'));
		expect(myMockFn.mock.calls.length).toBe(2);

		wrapper.setProps({ document: true });
		await wrapper.vm.$nextTick();

		global.window.document.dispatchEvent(new Event('click'));
		expect(myMockFn.mock.calls.length).toBe(3);
	});
});

/*
- Test toggling between document and window
- Add class to body
- SSR
*/

describe('Body', () => {
	it('should not catch "resize" on window', () => {
		const myMockFn = jest.fn();
		mount(PseudoWindow, {
			attachToDocument: true,
			propsData: {
				document: true,
			},
			listeners: {
				resize: myMockFn,
			},
		});

		global.window.dispatchEvent(new Event('resize'));

		expect(myMockFn).not.toHaveBeenCalled();
	});

	it('should catch "click" on document', () => {
		const myMockFn = jest.fn();
		mount(PseudoWindow, {
			attachToDocument: true,
			propsData: {
				document: true,
			},
			listeners: {
				click: myMockFn,
			},
		});

		global.window.document.dispatchEvent(new Event('click'));

		expect(myMockFn).toHaveBeenCalled();
	});
});

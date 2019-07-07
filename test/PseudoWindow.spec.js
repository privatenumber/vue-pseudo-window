import { mount } from '@vue/test-utils';
import PseudoWindow from '@/PseudoWindow';

describe('Window', () => {
	it('should not catch "click" event', () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
			attachToDocument: true,
		});

		global.window.dispatchEvent(new Event('click'));
		expect(myMockFn).not.toBeCalled();
		expect(wrapper.element).toMatchSnapshot();
	});

	it('should catch "resize" event', () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
			attachToDocument: true,
			listeners: {
				resize: myMockFn,
			},
		});

		global.window.dispatchEvent(new Event('resize'));
		expect(myMockFn).toBeCalled();
		expect(wrapper.element).toMatchSnapshot();
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
		expect(wrapper.element).toMatchSnapshot();
	});

	it('should catch "resize" event once', () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
			attachToDocument: true,
			listeners: {
				'~resize': myMockFn,
			},
		});

		global.window.dispatchEvent(new Event('resize'));
		global.window.dispatchEvent(new Event('resize'));
		expect(myMockFn.mock.calls.length).toBe(1);
		expect(wrapper.element).toMatchSnapshot();
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
		expect(wrapper.element).toMatchSnapshot();
	});
});

describe('Document', () => {
	it('should not catch "resize" on window', () => {
		const myMockFn = jest.fn();
		const wrapper = mount(PseudoWindow, {
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
		expect(wrapper.element).toMatchSnapshot();
	});

	it('should catch "click" on document', () => {
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

		expect(myMockFn).toHaveBeenCalled();
		expect(wrapper.element).toMatchSnapshot();
	});
});

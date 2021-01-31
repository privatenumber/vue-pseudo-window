import { mount } from '@vue/test-utils';
import PseudoWindow from '../dist/pseudo-window.esm.js';

describe('Modifiers', () => {
	beforeEach(() => {
		const div = document.createElement('div');
		div.id = 'app';
		global.window.document.body.append(div);
	});

	it('prevent', () => {
		const preventedCapture = jest.fn();
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						body
						@click.prevent="bodyClickHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				bodyClickHandler(event) {
					preventedCapture(event.defaultPrevented);
				},
			},
		}, { attachTo: '#app' });

		global.window.document.body.click();
		expect(preventedCapture).toBeCalled();
		expect(preventedCapture.mock.calls[0][0]).toBe(true);

		wrapper.destroy();
	});

	it('self', () => {
		const buttonClickHandler = jest.fn();
		const bodyClickHandler = jest.fn();

		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						body
						@click.self="bodyClickHandler"
					/>
					<button
						id="button"
						@click="buttonClickHandler"
					>
						Click me
					</button>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				buttonClickHandler,
				bodyClickHandler,
			},
		}, { attachTo: '#app' });

		global.window.button.click();
		expect(buttonClickHandler).toBeCalled();
		expect(bodyClickHandler).not.toBeCalled();

		global.window.document.body.click();
		expect(bodyClickHandler).toBeCalled();
		wrapper.destroy();
	});

	it('stop', () => {
		const windowClickHandler = jest.fn();
		const bodyClickHandler = jest.fn();
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						@click="windowClickHandler"
					/>
					<pseudo-window
						body
						@click.stop="bodyClickHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				windowClickHandler,
				bodyClickHandler,
			},
		}, { attachTo: '#app' });

		global.window.document.body.click();
		expect(bodyClickHandler).toBeCalled();
		expect(windowClickHandler).not.toBeCalled();
		wrapper.destroy();
	});

	it('once', () => {
		const clickHandler = jest.fn();
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						body
						@click.once="clickHandler"
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

		global.window.document.body.click();
		global.window.document.body.click();
		expect(clickHandler.mock.calls.length).toBe(1);
		wrapper.destroy();
	});

	it('capture', () => {
		const eventPhaseCapture = jest.fn();
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						@click.capture="windowClickHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				windowClickHandler(event) {
					// Pass in the primitive so it doesn't check at assertion
					eventPhaseCapture(event.eventPhase);
				},
			},
		}, { attachTo: '#app' });

		global.window.document.body.click();
		expect(eventPhaseCapture).toBeCalled();

		// (capturing=1, target=2, bubbling=3)
		expect(eventPhaseCapture.mock.calls[0][0]).toBe(1);
		wrapper.destroy();
	});

	it('passive', () => {
		const preventedCapture = jest.fn();
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						document
						@click.passive="clickHandler"
					/>
				</div>
			`,
			components: {
				PseudoWindow,
			},
			methods: {
				clickHandler(event) {
					event.preventDefault();

					// Pass in the primitive so it doesn't check at assertion
					preventedCapture(event.defaultPrevented);
				},
			},
		}, { attachTo: '#app' });

		global.window.document.body.click();
		expect(preventedCapture).toBeCalled();

		expect(preventedCapture.mock.calls[0][0]).toBe(false);
		wrapper.destroy();
	});
});

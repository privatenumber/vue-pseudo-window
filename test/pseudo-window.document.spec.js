import { mount } from '@vue/test-utils';
import PseudoWindow from 'vue-pseudo-window';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Document', () => {
	beforeEach(() => {
		const div = document.createElement('div');
		div.id = 'app';
		global.window.document.body.append(div);
	});

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
		}, { attachTo: '#app' });

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
		}, { attachTo: '#app' });

		global.window.document.dispatchEvent(new Event('click'));
		expect(clickHandler).toHaveBeenCalled();
	});

	it('switch from window to document to window', async () => {
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
		}, { attachTo: '#app' });

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

describe('Class', () => {
	it('static class', async () => {
		const wrapper = mount({
			template: `
				<pseudo-window
					document
					class="static-class"
				/>
			`,
			components: {
				PseudoWindow,
			},
		});

		const { classList } = global.window.document.documentElement;
		expect(classList.contains('static-class')).toBe(true);

		wrapper.destroy();

		expect(classList.contains('static-class')).toBe(false);
	});

	it('should add / remove class', async () => {
		const wrapper = mount({
			template: `
				<pseudo-window
					document
					class="static-class"
					:class="[
						'class-a',
						{
							'class-b': true,
							'class-c': false,
						}
					]"
				/>
			`,
			components: {
				PseudoWindow,
			},
		});

		const { classList } = global.window.document.documentElement;
		expect(classList.contains('static-class')).toBe(true);
		expect(classList.contains('class-a')).toBe(true);
		expect(classList.contains('class-b')).toBe(true);
		expect(classList.contains('class-c')).toBe(false);

		wrapper.destroy();

		expect(classList.contains('static-class')).toBe(false);
		expect(classList.contains('class-a')).toBe(false);
		expect(classList.contains('class-b')).toBe(false);
		expect(classList.contains('class-c')).toBe(false);
	});

	it('reactivity', async () => {
		const wrapper = mount({
			template: `
				<pseudo-window
					document
					:class="classStr"
				/>
			`,
			components: {
				PseudoWindow,
			},
			data() {
				return {
					classStr: '',
				};
			},
		});

		const { classList } = global.window.document.documentElement;

		expect(classList.toString()).toBe('');

		wrapper.setData({ classStr: 'reactive-class' });

		await wrapper.vm.$nextTick();

		expect(classList.contains('reactive-class')).toBe(true);

		wrapper.destroy();

		expect(classList.contains('reactive-class')).toBe(false);
	});

	it('reactivity 2', async () => {
		const wrapper = mount({
			template: `
				<div>
					<pseudo-window
						document
						class="static-class"
					/>
					{{ counter }}
				</div>
			`,
			components: {
				PseudoWindow,
			},
			data() {
				return {
					counter: 0,
				};
			},

			mounted() {
				setInterval(() => {
					this.counter += 1;
				}, 100);
			},
		});

		await sleep(1000);
		wrapper.destroy();
	});

	it('work with different existing class', async () => {
		const { classList } = global.window.document.documentElement;
		classList.add('should-remain');

		const wrapper = mount({
			template: `
				<pseudo-window
					document
					class="static-class"
				/>
			`,
			components: {
				PseudoWindow,
			},
		});

		expect(classList.contains('static-class')).toBe(true);

		wrapper.destroy();

		expect(classList.contains('should-remain')).toBe(true);
	});

	it('work with colliding existing class', async () => {
		const { classList } = global.window.document.documentElement;
		classList.add('should-remain');

		expect(classList.contains('should-remain')).toBe(true);

		const wrapper = mount({
			template: `
				<pseudo-window
					document
					class="should-remain"
				/>
			`,
			components: {
				PseudoWindow,
			},
		});

		wrapper.destroy();

		expect(classList.contains('should-remain')).toBe(true);
	});
});

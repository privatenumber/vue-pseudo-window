import { mount } from '@vue/test-utils';
import PseudoWindow from '../dist/pseudo-window.esm.js';

const sleep = ms => new Promise((resolve) => {
	setTimeout(resolve, ms);
});

describe('Events', () => {
	beforeEach(() => {
		const div = document.createElement('div');
		div.id = 'app';
		global.window.document.body.append(div);
	});

	it('should catch "click" on body', () => {
		const clickHandler = jest.fn();
		mount({
			template: `
				<div>
					<pseudo-window
						body
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

		global.window.document.body.dispatchEvent(new Event('click'));
		expect(clickHandler).toHaveBeenCalled();
	});
});

describe('Class', () => {
	it('invalid', async () => {
		mount({
			template: `
				<pseudo-window
					class="static-class"
				/>
			`,
			components: {
				PseudoWindow,
			},
		});

		const { classList } = global.window.document.body;
		expect(classList.contains('static-class')).toBe(false);
	});

	it('static class', async () => {
		const wrapper = mount({
			template: `
				<pseudo-window
					body
					class="static-class"
				/>
			`,
			components: {
				PseudoWindow,
			},
		});

		const { classList } = global.window.document.body;
		expect(classList.contains('static-class')).toBe(true);

		wrapper.destroy();

		expect(classList.contains('static-class')).toBe(false);
	});

	it('should add / remove class', async () => {
		const wrapper = mount({
			template: `
				<pseudo-window
					body
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

		const { classList } = global.window.document.body;
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
					body
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

		const { classList } = global.window.document.body;

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
						body
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
		const { classList } = global.window.document.body;
		classList.add('should-remain');

		const wrapper = mount({
			template: `
				<pseudo-window
					body
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
		const { classList } = global.window.document.body;
		classList.add('should-remain');

		expect(classList.contains('should-remain')).toBe(true);

		const wrapper = mount({
			template: `
				<pseudo-window
					body
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

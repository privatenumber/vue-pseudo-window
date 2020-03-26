import { mount } from '@vue/test-utils';
import PseudoWindow from 'vue-pseudo-window';

describe('Class', () => {
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
});

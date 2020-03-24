/**
 * @jest-environment node
 */

import Vue from 'vue';
import { render } from '@vue/server-test-utils';
import PseudoWindow from 'vue-pseudo-window';

describe('SSR', () => {
	it('declare', async () => {
		const warnHandler = jest.fn();
		Vue.config.warnHandler = warnHandler;

		const $render = () => render({
			template: '<pseudo-window />',
			components: {
				PseudoWindow,
			},
		});
		expect($render).not.toThrow();
		expect(warnHandler).not.toBeCalled();
	});
});

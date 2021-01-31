/**
 * @jest-environment node
 */

import Vue from 'vue';
import { render } from '@vue/server-test-utils';
import PseudoWindow from '../dist/pseudo-window.esm.js';

describe('SSR', () => {
	it('declare', () => {
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

	it('declare document', () => {
		const warnHandler = jest.fn();
		Vue.config.warnHandler = warnHandler;

		const $render = () => render({
			template: '<pseudo-window document class="hello-world" />',
			components: {
				PseudoWindow,
			},
		});
		expect($render).not.toThrow();
		expect(warnHandler).not.toBeCalled();
	});

	it('declare body', () => {
		const warnHandler = jest.fn();
		Vue.config.warnHandler = warnHandler;

		const $render = () => render({
			template: '<pseudo-window body class="hello-world" />',
			components: {
				PseudoWindow,
			},
		});
		expect($render).not.toThrow();
		expect(warnHandler).not.toBeCalled();
	});
});

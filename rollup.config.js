import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const isProd = process.env.NODE_ENV === 'production';

export default {
	input: 'src/pseudo-window.js',
	plugins: [
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true,
		}),
		isProd && terser({
			mangle: {
				properties: {
					regex: /^M_/,
				},
			},
		}),
		isProd && filesize(),
	],
	output: {
		dir: 'dist',
		format: 'umd',
		name: 'PseudoWindow',
	},
};

import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const isProduction = process.env.NODE_ENV === 'production';

export default {
	input: 'src/pseudo-window.js',
	plugins: [
		babel(),
		isProduction && terser(),
		isProduction && filesize(),
	],
	output: [
		{
			file: 'dist/pseudo-window.umd.js',
			format: 'umd',
			name: 'PseudoWindow',
		},
		{
			file: 'dist/pseudo-window.esm.js',
			format: 'esm',
		},
	],
};

const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	input: 'src/pseudo-window.js',
	plugins: [
		babel({
			exclude: 'node_modules/**',
		}),
		isProd && terser({
			// mangle: {
			// 	properties: {
			// 		regex: /handlers/
			// 	}
			// }
		}),
	],
	output: {
		dir: 'dist',
		format: 'umd',
		name: 'PseudoWindow',
	},
};

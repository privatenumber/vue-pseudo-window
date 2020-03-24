const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	input: 'src/PseudoWindow.js',
	plugins: [
		babel({
			exclude: 'node_modules/**',
		}),
		isProd && terser(),
	],
	output: {
		dir: 'dist',
		format: 'umd',
		name: 'PseudoWindow',
	},
};

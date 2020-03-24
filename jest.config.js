module.exports = {
	moduleFileExtensions: [
		'js',
		'vue',
	],
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\.jsx?$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'/node_modules/',
	],
	moduleNameMapper: {
		'vue-pseudo-window': '<rootDir>/dist/pseudo-window',
	},
};

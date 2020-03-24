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
		'^@/(.*)$': '<rootDir>/src/$1',
		'vue-pseudo-window': '<rootDir>/src/pseudo-window',
	},
	snapshotSerializers: [
		'jest-serializer-vue',
	],
};

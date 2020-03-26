const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	presets: [['@babel/preset-env', isProd ? {} : {
		useBuiltIns: 'usage',
		corejs: 2,
	}]],
};

var path = require('path');

const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const checkEnv = process.env.NODE_ENV === 'development'? true : false;

module.exports = {
	entry: './src/client.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	watch: false,
	module: {
		loaders: [
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-1']
				}
			}
		]
	}
}
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

require('@babel/register')({ extensions: ['.ts'], cache: false });

const babelOptions = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['> 5% in KR', 'last 2 chrome versions'],
				},
				debug: true,
			},
		],
		'@babel/preset-react',
	],
	plugins: ['@babel/plugin-proposal-class-properties', 'react-refresh/babel'],
	cacheDirectory: '.cache/babel-loader',
	cacheCompression: false,
	compact: false, // isEnvProduction,
	sourceType: 'unambiguous',
};

module.exports = {
	mode: 'development',
	target: 'web',

	entry: {
		index: path.resolve('./src/test.tsx'),
	},

	stats: {
		children: true,
	},

	output: {
		filename: 'static/js/[name].js',
		chunkFilename: 'static/js/[name].js',
		publicPath: '/',
		uniqueName: 'app',
	},

	devtool: 'cheap-module-source-map',

	optimization: {
		minimize: false,
	},

	performance: {
		maxAssetSize: 650 * 1024,
		maxEntrypointSize: 650 * 1024,
	},

	resolve: {
		extensions: ['.wasm', '.mjs', '.js', '.ts', '.d.ts', '.tsx', '.json'],
	},

	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions,
					},
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.(js|mjs)$/,
				loader: 'babel-loader',
				options: babelOptions,
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
		}),
		new ReactRefreshWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],

	devServer: {
		contentBase: './public',
		compress: true,
		port: 9000,
		hot: true,
	},
};

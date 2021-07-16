const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

require('@babel/register')({ extensions: ['.ts'], cache: false });

const babelOptions = {
	cacheDirectory: '.cache/babel-loader',
	cacheCompression: false,
	compact: false, // hmm
	sourceType: 'unambiguous',
	babelrc: true,
};

module.exports = {
	mode: 'production',

	entry: {
		index: path.resolve('./src/index.ts'),
	},

	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: '[name].js',
		publicPath: '/',
		libraryTarget: 'umd',
	},

	devtool: 'source-map',

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
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: 'bundle-report.html',
			openAnalyzer: false,
			generateStatsFile: false,
			statsFilename: 'bundle-stats.json',
		}),
	].filter(Boolean),

	externals: ['react', 'react-dom', 'react-router-dom'],
};

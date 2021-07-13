const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

require('@babel/register')({extensions: ['.ts'], cache: false});

module.exports = function config(env, options) {
    const babelOptions = {
        rootMode: 'upward',
        cacheDirectory: '.cache/babel-loader',
        cacheCompression: false,
        compact: false, // hmm
        sourceType: 'unambiguous',
    };

    const appConfig = {
        name: 'app',
        mode: 'production',
        target: 'browserslist',
        bail: true,

        entry: './index',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'static/js/[name].[contenthash:8].js',
            chunkFilename: 'static/js/[name].[contenthash:8].js',
            publicPath: '/',
            uniqueName: 'frame',
        },

        devtool: 'source-map',

        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {ecma: 8},
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {safari10: true},
                        keep_classnames: true,
                        keep_fnames: ture,
                        output: {ecma: 5, comments: false, ascii_only: true},
                    },
                }),
            ],
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        test: /[\\/].yarn[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
            runtimeChunk: {
                name: (entrypoint) => `runtime-${entrypoint.name}`,
            },
        },

        performance: {
            maxAssetSize: 650 * 1024,
            maxEntrypointSize: 650 * 1024,
        },

        resolve: {
            extensions: ['.wasm', '.mjs', '.js', '.ts', '.d.ts', '.tsx', '.json'],
            alias: {
                'react-dom$': 'react-dom/profiling',
                'scheduler/tracing': 'scheduler/tracing-profiling',
            },
        },

        module: {
            rules: [
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
                {
                    test: /\.ts(x?)$/,
                    include: path.resolve(__dirname),
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
                    include: path.resolve(__dirname),
                    loader: 'babel-loader',
                    options: babelOptions,
                },
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.APP_NAME': JSON.stringify('React App'),
                'process.env.APP_ORIGIN': JSON.stringify('http://localhost:3000'),
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'bundle-report.html',
                openAnalyzer: false,
                generateStatsFile: false,
                statsFilename: 'bundle-stats.json',
            }),
            new WebpackManifestPlugin({fileName: 'assets.json', publicPath: '/'}),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ].filter(Boolean),
    };

    return [appConfig];
};

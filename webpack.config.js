const path              = require('path');
const webpack           = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ## //

const etp = new ExtractTextPlugin('[name].css');

module.exports = {
    entry: {
        popup: './src/popup',
        background: './src/background',
    },

    output: {
        path: 'extension/dist',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [
                    'babel'
                ]
            },

            {
                test: /\.json$/,
                loaders: [
                    'json'
                ]
            },

            {
                test: /\.css$/,
                loader: etp.extract('css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:10]')
            }
        ]
    },

    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx'
        ],
        root: [
            path.resolve(__dirname)
        ],
        modulesDirectories: [
            'src',
            'node_modules'
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': process.env.NODE_ENV
        }),

        new HtmlWebpackPlugin({
            excludeChunks: [
                'background'
            ],
            template: 'src/popup/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true
        }),

        etp
    ],

    devtool: 'sourcemap'
};

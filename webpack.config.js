const path              = require('path');
const qs                = require('querystring');
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
                test: /\.less/,
                loader: etp.extract([
                    `css?${qs.stringify({
                        modules: true,
                        sourceMap: true,
                        importLoaders: 1,
                        localIdentName: '[local]_[hash:base64:10]'
                    })}`,
                    'resolve-url',
                    'postcss',
                    `less?${qs.stringify({
                        sourceMap: true
                    })}`
                ].join('!'))
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

    postcss: [
        require('postcss-focus')(),
        require('postcss-cssnext')()
    ],

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': process.env.NODE_ENV
        }),

        new webpack.optimize.OccurrenceOrderPlugin(),

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

        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        etp
    ],

    devtool: 'sourcemap'
};

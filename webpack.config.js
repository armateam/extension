const path              = require('path');
const qs                = require('querystring');
const webpack           = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ## //

const production = process.env.NODE_ENV === 'production';
const etp = new ExtractTextPlugin('[name].css');

let plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new HtmlWebpackPlugin({
        excludeChunks: [
            'background'
        ],
        template: 'src/popup/index.html',
        minify: {
            removeComments: production,
            collapseWhitespace: production,
            removeRedundantAttributes: production,
            useShortDoctype: production,
            removeEmptyAttributes: production,
            removeStyleLinkTypeAttributes: production,
            keepClosingSlash: production,
            minifyJS: production,
            minifyCSS: production,
            minifyURLs: production,
        },
        inject: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    }),

    etp
];

if (production) {
    plugins = [
        ...plugins,

        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ];
}

module.exports = {
    entry: {
        popup: [
            'babel-polyfill',
            './src/popup'
        ],

        background: [
            'babel-polyfill',
            './src/background'
        ],
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

    plugins: plugins,

    devtool: 'sourcemap'
};

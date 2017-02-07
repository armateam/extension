const webpack           = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ## //

const production = process.env.NODE_ENV === 'production';
const etp = new ExtractTextPlugin({
    filename: '[name].css'
});

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

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
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
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            },

            {
                test: /\.less/,
                loader: etp.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[local]_[hash:base64:10]'
                            }
                        },

                        'resolve-url-loader',

                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => ([
                                    require('postcss-focus')(),
                                    require('postcss-cssnext')()
                                ])
                            }
                        },

                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },

    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ],
        modules: [
            'src',
            'node_modules'
        ]
    },

    plugins: plugins,

    devtool: 'sourcemap'
};

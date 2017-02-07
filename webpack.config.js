const webpack           = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ## //

const production = process.env.NODE_ENV === 'production';

let plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.LoaderOptionsPlugin({
        minimize: production
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

    new ExtractTextPlugin({
        filename: 'style/[name].css'
    })
];

if (production) {
    plugins = [
        ...plugins,

        new webpack.optimize.UglifyJsPlugin()
    ];
}

const config = {
    entry: {
        popup: [
            'babel-polyfill',
            'font-awesome/css/font-awesome.css',
            './src/popup'
        ],

        background: [
            'babel-polyfill',
            './src/background'
        ],
    },

    output: {
        path: 'extension/dist',
        filename: 'scripts/[name].js',
        publicPath: '/dist/'
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
                test: /\.(eot|svg|ttf|woff2?)(\?.*$|$)/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },

            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !production
                            }
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => ([
                                    require('postcss-focus')(),
                                    require('postcss-cssnext')()
                                ])
                            }
                        }
                    ]
                })
            },

            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: !production,
                                importLoaders: 1,
                                localIdentName: '[local]_[hash:base64:10]',
                                camelCase: true
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
                                sourceMap: !production
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

    plugins: plugins
};

if (!production) {
    config.devtool = 'sourcemap';
}

// ## //

module.exports = config;

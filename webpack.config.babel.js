import path from 'path'
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

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
        path: path.resolve('extension/dist'),
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
                                sourceMap: !production,
                                minimize: {
                                    autoprefixer: {
                                        add: true,
                                        remove: true,
                                        browsers: ['last 2 versions']
                                    },
                                    discardComments: {
                                        removeAll: true
                                    },
                                    discardUnused: false,
                                    mergeIdents: false,
                                    reduceIdents: false,
                                    safe: true,
                                    sourcemap: !production
                                }
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
                                camelCase: true,
                                minimize: {
                                    autoprefixer: {
                                        add: true,
                                        remove: true,
                                        browsers: ['last 2 versions']
                                    },
                                    discardComments: {
                                        removeAll: true
                                    },
                                    discardUnused: false,
                                    mergeIdents: false,
                                    reduceIdents: false,
                                    safe: true,
                                    sourcemap: !production
                                }
                            }
                        },

                        'resolve-url-loader',

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
        ]
    },

    plugins: plugins
};

if (!production) {
    config.devtool = 'sourcemap';
}

// ## //

module.exports = config;

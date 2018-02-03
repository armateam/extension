const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { default: ImageminPlugin } = require('imagemin-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const WebExtManifestPlugin = require('./build/manifest-plugin')

const production = process.env.NODE_ENV === 'production'

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: production,
    debug: false
  }),

  new HtmlWebpackPlugin({
    excludeChunks: [
      'background'
    ],
    template: 'src/popup/index.html',
    filename: 'popup.html',
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
      minifyURLs: production
    },
    inject: true
  }),

  new HtmlWebpackPlugin({
    excludeChunks: [
      'popup'
    ],
    template: 'src/background/index.html',
    filename: 'background.html',
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
      minifyURLs: production
    },
    inject: true
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'common'
  }),

  new ExtractTextPlugin({
    filename: 'style/[name].css'
  }),

  new CopyWebpackPlugin([{
    from: 'images',
    to: 'images'
  }]),

  new CopyWebpackPlugin([{
    from: 'src/_locales',
    to: '_locales'
  }]),

  new WebExtManifestPlugin()
]

if (production) {
  plugins = [
    ...plugins,

    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin(),
    new ImageminPlugin({ test: /\.png$/ }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.resolve('reports/bundles.html'),
      defaultSizes: 'gzip'
    })
  ]
}

const config = {
  entry: {
    popup: [
      'regenerator-runtime/runtime',
      './src/popup'
    ],

    background: [
      'regenerator-runtime/runtime',
      './src/background'
    ]
  },

  output: {
    path: path.resolve('extension'),
    filename: production ? 'scripts/[name].[chunkhash].js' : 'scripts/[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },

  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },

  plugins
}

if (!production) {
  config.devtool = 'sourcemap'
}

// ## //

module.exports = config

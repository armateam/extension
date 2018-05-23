const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {default: ImageminPlugin} = require('imagemin-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

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
      collapseWhitespace: production
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
      collapseWhitespace: production
    },
    inject: true
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

    new ImageminPlugin({test: /\.png$/}),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.resolve('reports/bundles.html'),
      defaultSizes: 'gzip'
    })
  ]
}

const config = {
  mode: production ? 'production' : 'development',

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
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0
        }
      }
    },
    occurrenceOrder: true
  },

  plugins
}

// ## //

module.exports = config

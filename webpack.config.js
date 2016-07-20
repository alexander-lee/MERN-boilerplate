'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client',
  './client/index/app.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },

  cache: true,
  debug: false,
  devtool: 'eval',

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',//['react-hot', 'babel'],
      },
      /*
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      */
      {
        test: /\.(scss|sass)$/,
        loader: 'style!css?modules!sass?outputStyle=expanded'
      },
      {
        test: /\.css$/,
        loader: 'style!css' //Same thing as [style-loader, css-loader]
      },
      {
        test: /\.(png|jpg|woff|woff2|gif)$/, 
        loader:'url-loader?limit=8192&prefix=/'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

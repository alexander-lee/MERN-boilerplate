'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './client/index/app.js',
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js',
    publicPath: '/'
  },

  cache: true,
  debug: false,

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    loaders: [
      {
        test: /\.(scss|sass)$/,
        loader: 'style!css?modules!sass?outputStyle=expanded'
      }
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
    new webpack.NoErrorsPlugin()
  ]
}

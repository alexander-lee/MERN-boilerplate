'use strict';
const webpack = require('webpack');
const path = require('path');
const debug = process.env.NODE_ENV !== 'production';

const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin()
];

module.exports = {
  entry: [
    path.join(__dirname, 'client', 'app.js')
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },

  cache: true,
  debug: debug,
  devtool: debug ? 'source-map' : null,

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        // query: presets defined in .babelrc
      },
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
      },
      {
        test: /\.(json)$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    ...!debug && productionPlugins
  ]
}

var base = require('./webpack.config.base.js');
var webpack = require('webpack');
var path = require('path');
var nodeDir = path.resolve(__dirname, 'node_modules');

var loaders = base.module.loaders.slice();
loaders.push(
  {
      test:/\.(pcss|postcss)$/,
      loader: 'style-loader!css-loader?modules!postcss-loader'
  },
  {
      test:/\.(css)$/,
      loader: 'style-loader!css-loader?modules'
  }
);

var config = Object.assign({}, base, {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
  module: {
    loaders
  }
});

module.exports = config;
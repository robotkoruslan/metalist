const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../client/index.html'),
      filename: 'index.html',
      mobile: true,
      inject: true
    })
  ]
});
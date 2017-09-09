const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../client/index.html'),
      hash: true,
      filename: 'index.html',
      mobile: true,
      inject: true
    })
  ]
});
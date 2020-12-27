const path = require("path");
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const parts = require('./webpack.parts.js');

module.exports = merge(
  parts.loadSCSSWithPostCSS({ postPlugins: [ 'postcss-preset-env' ] }),
  parts.loadBabel({ presets: [ '@babel/preset-env' ] }),
  common,
  {
    mode: "production",
    output: {
      publicPath: '',
      filename: "js/[name].[contenthash].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      })
    ]
  }
);
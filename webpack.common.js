const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./webpack.parts.js');
const { merge } = require('webpack-merge');

module.exports = merge(
  {
    entry: {
      main: "./src/index.js"
    },
  },
  parts.createNewHtml({ pathTemplate: './src/html/index.html' }),
  parts.loadHtml(),
  parts.loadFileImages({ output: 'assets' }),
  parts.copyCodeMirror()
);
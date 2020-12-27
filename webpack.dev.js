const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts.js');

module.exports = merge(
  parts.loadSCSS(),
  parts.devServer({ port: 8080 }),
  common,
  {
    mode: "development",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
  }
);
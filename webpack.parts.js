const path = require("path");
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

exports.loadSCSS = () => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  }
});

exports.loadSCSSWithPostCSS = ({ postPlugins } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: postPlugins.map(plugin => [ plugin ])
              }
            }
          },
          'sass-loader'
        ]
      },
    ]
  }
});

exports.loadHtml = () => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                tag: 'img',
                attribute: 'src',
                type: 'src'
              }
            ]
          }
        }
      }
    ]
  }
})

exports.loadFileImages = ({ output } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: output
            }
          }
        ]
      }
    ]
  }
})

exports.loadBabel = ({ presets = [], plugins = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: presets.map(preset => [ preset ]),
            plugins: plugins.map(plugin => [ plugin ])
          }
        }
      }
    ]
  }
});

exports.copyCodeMirror = () => ({
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/js/codemirror', to: './js/codemirror' }
      ]
    })
  ]
})

exports.createNewHtml = ({ pathTemplate } = {}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: pathTemplate
    })
  ]
})

exports.devServer = ({ port }) => ({
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: port,
    open: true,
    watchContentBase: true
  }
})
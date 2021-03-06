const { absoluteDir } = require('./tool')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const base = require('./base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = webpackMerge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: absoluteDir('../src/client-entry.js'),
  output: {
    path: absoluteDir('../public/'),
    filename: '[name]-[hash].js',
    publicPath: 'http://127.0.0.1:3001/'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader','css-loader']
      },
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    hot: true,
    historyApiFallback: true,
    // publicPath: '/'
  },
  plugins: [
    new VueClientPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
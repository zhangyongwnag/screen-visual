'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const paths = require('./paths');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            include: paths.appSrc,
            exclude: '/node_modules/', // 排除node_modules，第三方代码已经处理，不需要二次处理
          }
        },
      },
      {
        test: /\.(mp4|\?.*)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'static/img/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.appHtml,
      inject: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    host: 'localhost', // host地址
    port: '3000', // 端口
    // open: true, //自动拉起浏览器
    hot: true, //热加载
    hotOnly: true, // 热加载不更新
    // proxy: {}, // 跨域
    // bypass: {} // 拦截器
  },
};

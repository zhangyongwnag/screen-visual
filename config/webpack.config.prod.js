'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCssWebpack = require('purifycss-webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require("glob");
const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const paths = require('./paths');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: paths.servedPath
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            include: [paths.appSrc,path.resolve(__dirname,'config')],
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule:false, // 设为false，否则图片编译为 [object Module]
            name: 'static/img/[name].[hash:8].[ext]',
            limit: 10240, // 超过10K打包为图片，反之打包为base64
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: [paths.appBuild]
    }),
    new HtmlWebpackPlugin({
      title:'大屏-数据可视化',
      inject: true,
      template: paths.appHtml,
      favicon: path.resolve(__dirname,'../public/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      cdn: {
        js: [
          'https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts.min.js', // 配置cdn资源
        ]
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: '5555',
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    }),
    new OptimizeCSSPlugin(),
    // new PurifyCssWebpack({
    //   //!*.html 表示 src 文件夹下的所有 html 文件，还可以清除其它文件 *.js、*.php···
    //   paths: glob.sync(path.join(__dirname, 'src/!*.js'))
    // }),
    new UglifyJsPlugin({
      cache: true, // 开启缓存
      parallel: true, // 多线程构建
      sourceMap: false, // 使用sourceMap捕获错误
      // uglifyOptions: {
      //   compress: {
      //     drop_console: true, // 放弃对 console 函数的调用
      //     drop_debugger: true, // 删除 debugger语句
      //   }
      // },
    }),
    // new CompressionPlugin({
    //   test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 匹配资源
    //   filename: '[path].gz[query]', // 输出名称
    //   algorithm: 'gzip', // 压缩方式
    //   threshold: 10240, // 处理大于10240字节才会压缩
    //   minRatio: 0.8 // 压缩率小于才会被压缩
    // }),

    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, './src/static'),
    //       to: path.resolve(__dirname, './dist/static')
    //     }
    //   ]
    // })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  optimization: {
    splitChunks: {
      chunks: 'initial', // 对入口文件处理
      cacheGroups: {
        vendor: {
          test: /node_modules\//,
          name: 'js/vendor',
          priority: 10,
          enforce: true
        },
        common: {
          minChunks: 2,
          name: 'js/common',
          priority: 10,
          enforce: true
        }
      },
    },
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
  },
  externals: {
    echarts: 'echarts' // 这里以axios库为示例
  },
};

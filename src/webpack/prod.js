const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const compiler = webpack({
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'main.js',
    // path: path.resolve(__dirname, 'dist'),
  },
  stats: 'verbose',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      fileName: '[name].[contenthash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),

    // new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),

    // OccurrenceOrderPlugin is needed for long-term caching to work properly.
    // See http://mxs.is/googmv
    // new webpack.optimize.OccurrenceOrderPlugin(true),

    new CleanWebpackPlugin({
      verbose: true
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
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
        minifyURLs: true,
      },
      inject: true,
    }),

  ],

  optimization: {
    splitChunks: {
      minChunks: 2,
    },

    // Minify and optimize the JavaScript
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
})

module.exports = compiler;

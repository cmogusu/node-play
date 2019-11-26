const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const compiler = webpack({
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'main.js',
    // path: path.resolve(__dirname, 'dist'),
  },
  stats: 'verbose',
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/,
  },
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
      fileName: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
})

module.exports = compiler;

'use-strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEFAULT_ENTRY = {
  HTML_PATH: './src/index.html',
  JS_PATH: './src/index.js',
};
const PRODUCTION_DIR = '../dist';
const DEVELOPMENT_MODE = 'development';
const isOnDevMode = process.env.NODE_ENV === DEVELOPMENT_MODE;

module.exports = {
  entry: DEFAULT_ENTRY.JS_PATH,
  output: {
    path: path.resolve(__dirname, PRODUCTION_DIR),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, PRODUCTION_DIR),
    compress: isOnDevMode,
    hot: true,
  },
  devtool: 'inline-source-map',
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isOnDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isOnDevMode,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isOnDevMode,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isOnDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isOnDevMode,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: DEFAULT_ENTRY.HTML_PATH, chunksSortMode: 'dependency' }),
    new MiniCssExtractPlugin({
      filename: isOnDevMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: isOnDevMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
    }),
  ],
};

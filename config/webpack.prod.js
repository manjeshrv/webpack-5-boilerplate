const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../dist'), // JS output folder path
    filename: 'main.bundle.[contenthash].js', // JS file name with unique content-hash
    assetModuleFilename: 'assets/[hash][ext][query]', // Store all assets in this folder path
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Extract css to seperate file
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Autp prefix css properties
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          // Compile sass to css
          'sass-loader',
        ],
      },
      // Compile JS files
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(), // Delete all content in dist
    new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }), // Rename css file with unique content-hash
  ],
});

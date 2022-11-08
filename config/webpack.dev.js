const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../dist'), // JS output folder path
    filename: 'main.bundle.js', // JS file name
  },

  mode: 'development',

  devtool: 'source-map',

  module: {
    rules: [
      // For css, sass & scss files
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  devServer: {
    // Before function reloads project after making changes to html file in src folder
    before: function (_, server) {
      server._watch('./src/**/*.html');
    },
    hot: true, // Enable css update without fullpage reload
    port: 8000, // Port run project
    host: '0.0.0.0', // Enable viewing project on diff devices
  },
});

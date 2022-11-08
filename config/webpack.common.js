const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Project entry point
  entry: './src/script/app.js',

  module: {
    rules: [
      // Use this loader for html files
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // For images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // For fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to src index.html file
      filename: 'index.html', // File name for production html file
      scriptLoading: 'blocking',
    }),

    // new HtmlWebpackPlugin({
    //   template: './src/pricing.html',
    //   filename: 'pricing.html',
    //   scriptLoading: 'blocking',
    // }),
  ],
};

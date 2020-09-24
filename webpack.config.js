const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },

  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },

  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

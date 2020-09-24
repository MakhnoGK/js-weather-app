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
      /*
      * For using with just CSS
      * */
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      /*
      * And for use with SASS pre-processor (optionally)
      * */
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

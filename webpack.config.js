const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const settings = (env) => {
  return {
    entry: {
      main: './src/app.js'
    },

    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: false
      })
    ],

    module: {
      rules: [
        /*
         * For using with just CSS
         * */
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },

        /*
         * And for use with SASS pre-processor (optionally)
         * */
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },

        /*
         * Loading image files in specific directories
         */
        {
          test: /\.(png|gif|svg|jpe?g)$/i,
          loader: 'file-loader',
          options: {
            name (resourcePath, resourceQuery) {
              if (env.production) {
                return '[name].[ext]'
              }

              return '[contenthash].[ext]'
            },
            outputPath: 'images'
          }
        },

        /*
         * Loading fonts
         */
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
          options: {
            name (resourcePath, resourceQuery) {
              if (env.production) {
                return '[name].[ext]'
              }

              return '[contenthash].[ext]'
            },
            outputPath: 'fonts'
          }
        },

        /*
         * Fix for HtmlWebpackPlugin can't load images from template
         */
        {
          test: /\.(html)$/i,
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      ]
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}

module.exports = settings

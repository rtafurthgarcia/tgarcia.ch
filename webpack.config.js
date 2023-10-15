const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'assets', 'js', 'app.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'js')
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'public', 'index.html'),
      template: path.join(__dirname, 'assets', 'views', 'index.pug')
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'public', 'other_error.html'),
      template: path.join(__dirname, 'assets', 'views', 'other_error.pug')
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'public', '404.html'),
      template: path.join(__dirname, 'assets', 'views', '404.pug')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'assets', 'css'),
          to: path.join(__dirname, 'public', 'css')
        },
        {
          from: path.join(__dirname, 'assets', 'fonts'),
          to: path.join(__dirname, 'public', 'fonts')
        },
        {
          from: path.join(__dirname, 'assets', 'images'),
          to: path.join(__dirname, 'public', 'images')
        },
        {
          from: path.join(__dirname, '.git'),
          to: path.join(__dirname, 'public', '.git')
        },
        {
          from: path.join(__dirname, 'assets', 'files'),
          to: path.join(__dirname, 'public')
        }
      ]
    })
  ],
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: true,
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000
  }
}

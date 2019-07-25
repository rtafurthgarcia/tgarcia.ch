const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'assets', 'js', 'app.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'js')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
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
    new CopyWebpackPlugin([
      { 
        from: "./assets/css/*", 
        to: "../../dist/css",
        toType: 'dir',
        flatten: true
      },
      { 
        from: "./assets/fonts/*", 
        to: "../../dist/fonts",
        toType: 'dir',
        flatten: true
      },
      { 
        from: "./assets/images/*", 
        to: "../../dist/images",
        toType: 'dir',
        flatten: true
      },
      { 
        from: "./assets/cv.pdf", 
        to: "../../dist/cv.pdf",
        toType: 'file',
        flatten: true
      },
    ])
  ],
  devtool: 'source-map',
  node: {
    __dirname: true,
    __filename: true,
  }
};
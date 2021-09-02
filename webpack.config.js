const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: { minimize: true }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.jsx', '.ts', '.js', '.json', '.css'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  output: {
    path: __dirname + "/build"
  }
}
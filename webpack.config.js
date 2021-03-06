const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  mode: "production",
  entry: './src/main.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: [path.resolve(__dirname, "src/component")],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
        include: [path.resolve(__dirname, "src/component")],
      },
      {
        test: /\.(ttf|eot|woff2|woff|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: '/dist',
    open: true
  }
}

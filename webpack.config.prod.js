const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/nano-modules.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "nano-modules",
      template: "./src/nano-modules.html",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new CopyPlugin({
      patterns: [
        { from: "./assets", to: "assets" },
        { from: "./src/manifest.json", to: "." }
      ],
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /src\/nano_modules/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};

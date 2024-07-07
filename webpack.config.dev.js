const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
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
      template: "./src/template.index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new CopyPlugin({
      patterns: [
        { from: "./assets", to: "assets" },
        { from: "./src/manifest.json", to: "." },
        { from: "./src/nano_modules", to: "nano_modules" },
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

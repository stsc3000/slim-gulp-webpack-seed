var path = require("path");
var webpack = require("webpack");
module.exports = {
  cache: true,
  debug: true,
  devtool: '#source-map',
  entry: {
    app: "./app",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [
      // required to write "require('./style.css')"
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  resolve: {
    alias: {
      // Bind version of jquery
      jquery: "jquery-2.0.3",
    }
  }
};

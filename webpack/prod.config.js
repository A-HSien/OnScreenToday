// Webpack config for creating the production bundle.

require("babel/register");

var path = require("path");
var webpack = require("webpack");
var writeStats = require("./utils/write-stats");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var strip = require("strip-loader");

var assetsPath = path.join(__dirname, "../public/assets");

module.exports = {
  devtool: "source-map",
  entry: {
    "main": "./src/client.js"
  },
  output: {
    path: assetsPath,
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader("debug"), "babel"] },
      { test: /\.jsx/, exclude: /node_modules/, loaders: [strip.loader("debug"), "babel"] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!autoprefixer?browsers=last 2 version!sass") },
      { test: /\.css/, loader: "style-loader!css-loader" },

      { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" },
    ]
  },
  progress: true,
  plugins: [

    // ignore debug statements
    new webpack.NormalModuleReplacementPlugin(/debug/, process.cwd() + "/webpack/utils/noop.js"),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin("[name]-[chunkhash].css"),

    // set global vars
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),

        // used to know we are on browser
        NODE_ENV: JSON.stringify("production")

        // clean up some react stuff
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
 

    // stats
    function() { this.plugin("done", writeStats); }

  ]
};

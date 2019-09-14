const Path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    app: Path.resolve(__dirname, "../src/scripts/index.js")
  },
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "js/[name].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: Path.resolve(__dirname, "../public"), to: "" }]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "../src/index.html")
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles/[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      }
    ]
  }
};

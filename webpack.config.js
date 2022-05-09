const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./js/src/index.js",
  output: {
    filename: "keyboard.js",
    path: path.resolve(__dirname, "js/out")
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
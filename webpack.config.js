const path = require("path");
const SRC = path.resolve(__dirname, "./client");
const DIST = path.resolve(__dirname, "./public");

module.exports = {
  entry: path.resolve(SRC, "index.jsx"),
  output: {
    path: path.resolve(DIST, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};

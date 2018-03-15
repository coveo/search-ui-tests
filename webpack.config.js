const webpack = require("webpack");
const minimize = process.argv.indexOf("--optimize-minimize") !== -1;
const colors = require("colors");
if (minimize) {
  console.log("Building minified version of the library".bgGreen.red);
} else {
  console.log("Building non minified version of the library".bgGreen.red);
}

const packageName = "CoveoJsSearchTests";

// Fail plugin will allow the webpack ts-loader to fail correctly when the TS compilation fails.
var plugins = [];

if (minimize) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  );
}

module.exports = {
  mode: "development",
  entry: "./src/Index.ts",
  output: {
    path: require("path").resolve("./bin/js"),
    filename: minimize ? `${packageName}.min.js` : `${packageName}.js`,
    chunkFilename: minimize ? `${packageName}.min.js` : `${packageName}.js`,
    libraryTarget: "umd",
    library: "CoveoJsSearchTests",
    publicPath: "js/",
    devtoolModuleFilenameTemplate: "[resource-path]"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devtool: "source-map",
  externals: [
    {
      "coveo-search-ui": "Coveo"
    }
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {}
      }
    ]
  },
  plugins: plugins,
  bail: true
};

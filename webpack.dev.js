const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",

    entry: {
        "bundle": path.join(__dirname, "./lyts_app_src/launcher.ts")
    },

    devtool: "source-map"

});
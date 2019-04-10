const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.ext.js");

module.exports = merge(common, {
    mode: "development",

    entry: {
        "background": path.join(__dirname, "lyts_chrome_extension/background.ts"),
        "content": path.join(__dirname, "lyts_chrome_extension/content.ts"),
        "inject/get_content": path.join(__dirname, "lyts_chrome_extension/inject_code/get_content.ts")
    },

    devtool: "source-map"

});
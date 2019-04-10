const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.ext.js");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: "production",

    entry: {
        "background.min": path.join(__dirname, "lyts_chrome_extension/background.ts"),
        "content.min": path.join(__dirname, "lyts_chrome_extension/content.ts"),
        "inject/get_content.min": path.join(__dirname, "lyts_chrome_extension/inject_code/get_content.ts")
    },

    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                exclude: /node_modules/,
            })
        ]
    },

});
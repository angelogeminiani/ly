var path = require('path');

var config = {

    entry: './lyts/lyts_core/ly.ts',

    output: {
        path: path.resolve(__dirname, 'build_core'),
        filename: 'lyts.js'
    },

    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};


var config_app = {

    entry: './lyts_app_src/launcher.ts',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};


var config_tests = {

    entry: './tests/index.ts',

    output: {
        path: path.resolve(__dirname, 'build_tests'),
        filename: 'bundle.js'
    },

    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = [config, config_app, config_tests];
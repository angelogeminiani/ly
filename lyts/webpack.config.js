const path = require('path');

const config = {

    entry: './lyts_core/ly.ts',

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

const config_tests = {

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

const config_app = {

    entry: './lyts_zen_app/launcher.ts',

    output: {
        path: path.resolve(__dirname, 'build_sample_app'),
        filename: 'build.js'
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


module.exports = [config, config_tests, config_app];
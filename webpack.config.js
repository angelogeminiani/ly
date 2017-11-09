const path = require('path');

const config = {

    entry: './src/ly.ts',

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

const config_sample = {

    entry: './src_sample/index.ts',

    output: {
        path: path.resolve(__dirname, 'build_sample'),
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

module.exports = [config, config_sample];
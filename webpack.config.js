const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function (env) {
    const _plugins = [];

    if (env === 'analyzer') {
        _plugins.push(new BundleAnalyzerPlugin());
    }

    return {
        entry: ['./src/api/index.js'],

        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'hypertonic.js',
            library: 'hypertonic',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        target: 'node', // need to build
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        stats: {
            colors: true
        },
        devtool: 'source-map',
        plugins: _plugins
    };
};

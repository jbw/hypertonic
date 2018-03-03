const { resolve } = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function (env) {
    const _plugins = [];

    if (env === 'analyzer') {
        _plugins.push(new BundleAnalyzerPlugin());
    }
    return {
        entry: ['./src/api/index.js'],
        target: 'node',
        output: {
            path: resolve(__dirname, '../build'),
            filename: 'hypertonic.js',
            library: 'hypertonic',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },

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

        devtool: 'eval',

        plugins: _plugins
    };
};

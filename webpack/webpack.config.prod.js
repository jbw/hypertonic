const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfigBase = require('./webpack.config.js');

module.exports = function (env) {

    return webpackMerge(webpackConfigBase(env), {

        devtool: 'cheap-module-source-map',

        performance: {
            hints: 'warning'
        },

        plugins: [
            new CleanWebpackPlugin(['build']),

            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),

            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true
                },
                output: {
                    comments: false
                },
                sourceMap: true
            })
        ]
    });
};

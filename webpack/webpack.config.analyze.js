const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfigProd = require('./webpack.config.prod.js');

module.exports = function (env) {

    return webpackMerge(webpackConfigProd(env), {
        plugins: [new BundleAnalyzerPlugin()]
    });
};

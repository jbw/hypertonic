const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const webpackConfigBase = require('./webpack.config.js');

module.exports = function (env) {

    return webpackMerge(webpackConfigBase(env), {

        performance: {
            hints: 'warning'
        },

        plugins: [

            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),

            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor',
            //     children: true,
            //     minChunks(module) {
            //         return module.context && -1 !== module.context.indexOf('node_modules');
            //     }
            // }),

            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'manifest',
            //     minChunks: Infinity
            // }),

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
                    comments: false // allow comments in debug mode
                }
            }),


            new webpack.optimize.AggressiveMergingPlugin(),

            new webpack.optimize.MinChunkSizePlugin({
                minChunkSize: 50000
            }),

            new webpack.HashedModuleIdsPlugin(),

            new webpack.optimize.OccurrenceOrderPlugin(true)

            /*new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })*/
        ]
    });
};

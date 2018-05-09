/**
 * Created by cpzhang on 2018/5/3.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config.js');
/*const UglifyJsPlugin = require('uglifyjs-webpack-plugin');*/

module.exports = merge(base,{
    mode:'production',
    /*devtool: 'source-map',*/
    output:{
        filename: '[name].[chunkhash].js',
        chunkFilename: 'chunk/[name].[chunkhash].js'
    },
    plugins:[
        /*new UglifyJsPlugin({
            sourceMap:true
        }),*/
        /*new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })*/
        new webpack.HashedModuleIdsPlugin()
    ]
});
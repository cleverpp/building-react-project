/**
 * Created by cpzhang on 2018/5/3.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config.js');
/*const UglifyJsPlugin = require('uglifyjs-webpack-plugin');*/
/*const ExtractTextPlugin = require('extract-text-webpack-plugin');*/
/*const MiniCssExtractPlugin = require("mini-css-extract-plugin");*/

module.exports = merge(base, {
    mode: 'production',
    /*devtool: 'source-map',*/
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: 'chunk/[name].[chunkhash].js'
    },
    module: {
        rules: [
            /*{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }*/
        ]
    },
    plugins: [
        /*new UglifyJsPlugin({
         sourceMap:true
         }),*/
        /*new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify('production')
         })*/
        /*new ExtractTextPlugin({
         filename:'[name].[hash:8].css'
         /!*allChunks:true*!/
         })*/
        /*new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "css/[id].css"
         })*/
        new webpack.HashedModuleIdsPlugin()
    ]
});
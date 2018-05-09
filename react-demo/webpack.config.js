/**
 * Created by cleverzhang on 2018/2/28.
 */
const path = require('path');
const root = __dirname;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CleanWebpackPlugin = require('clean-webpack-plugin');
/*const ExtractTextPlugin = require('extract-text-webpack-plugin');*/
/*const MiniCssExtractPlugin = require("mini-css-extract-plugin");*/

module.exports = {
    bail: true,
    entry: {
        /*'webpack-dev-server/client',*/
        main:path.resolve(root, 'src/main.js')
    },
    output: {
        path: path.resolve(root, 'dist')
    },
    /*externals:{
     Zepto:'Zepto'
     },*/
    optimization:{
        runtimeChunk:true,
        splitChunks:{
            chunks:'all'
        }
    },
    module: {
        rules: [
            {test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=30720&name=images/[name].[ext]?[hash:8]',
                exclude: path.resolve(root, 'src/images/normal')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader?name=images/normal/[name].[ext]?[hash:8]',
                include: path.resolve(root, 'src/images/normal')
            },
            /*{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use:'css-loader',
                    fallback:'style-loader'
                })
            }*/
            /*{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }*/
        ]
    },
    /*optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'style',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },*/
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
        /*new ExtractTextPlugin({
            filename:'[name].[hash:8].css'
            /!*allChunks:true*!/
        })*/
        /*new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "css/[id].css"
        })*/
    ]
};
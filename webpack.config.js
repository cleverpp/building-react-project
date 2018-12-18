/**
 * Created by cleverzhang on 2018/2/28.
 */
const path = require('path');
const root = __dirname;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {ReactLoadablePlugin} = require('react-loadable/webpack');


module.exports = {
    bail: true,
    entry: {
        /*'webpack-dev-server/client',*/
        main: path.resolve(root, 'src/main.js')
    },
    output: {
        path: path.resolve(root, 'dist')
    },
    /*externals:{
     Zepto:'Zepto'
     },*/
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all'
        }
        /*cacheGroups: {
            styles: {
                name: 'style',
                test: /\.css$/,
                chunks: 'all',
                enforce: true
            }
        }*/
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
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new ReactLoadablePlugin({
            filename: './dist/react-loadable.json'
        })
    ]
};
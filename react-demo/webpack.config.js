/**
 * Created by cleverzhang on 2018/2/28.
 */
const path = require('path');
const root = __dirname;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    bail:true,
    entry:[
        /*'webpack-dev-server/client',*/
        path.resolve(root, 'src/main.js')
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: 'chunck/[name].bundle.js',
        path: path.resolve(root, 'dist')
    },
    externals:{
        Zepto:'Zepto'
    },
    module: {
        rules: [
            {test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/},
            {test:/\.css$/,use:['style-loader','css-loader']}
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};
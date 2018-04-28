/**
 * Created by cleverzhang on 2018/2/28.
 */
const path = require('path');
const root = __dirname;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
/*const UglifyJsPlugin = require('uglifyjs-webpack-plugin');*/
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode:'development',
    entry:[
        /*'webpack-dev-server/client',*/
        path.resolve(root, 'src/main.js')
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(root, 'dist')
    },
    devServer:{
        contentBase: path.resolve(root, "dist"),
        host:"0.0.0.0", // 或者你本机的ip，不设置这个默认只能localhost访问
        port:9002,
        compress:true,
        hot:true
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
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
/**
 * Created by cpzhang on 2018/5/3.
 */
const webpack = require('webpack');
const path = require('path');
const root = __dirname;
const merge = require('webpack-merge');
const base = require('./webpack.config.js');

module.exports = merge(base,{
    mode:'development',
    devtool: 'inline-source-map',
    devServer:{
        contentBase: path.resolve(root, "dist"),
        host:"0.0.0.0", // 或者你本机的ip，不设置这个默认只能localhost访问
        port:9002,
        compress:true,
        hot:true
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
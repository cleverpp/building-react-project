## 基础配置，让React运行起来
entry：入口文件

output：打包后的文件输出

loader：如何处理资源文件，例如我们使用es6，则需要babel-loader来解析js或jsx等。

plugins：处理各种特定的任务，例如生产环境，我们需要将文件压缩混淆，这个任务通过plugins来处理。

webpack.config.js

```
const path = require('path');
const root = __dirname;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm

module.exports = {
    entry: path.resolve(root, 'src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(root, 'dist')
    },
    module: {
        rules: [
            {test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/}
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}
```
## webpack-dev-server
它提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。
1. 安装
```
npm install --save-dev webpack-dev-server
```
2. 配置，在webpack配置文件中，增加一项属性devServer
- contentBase:运行的目标目录，告诉服务器从哪里提供内容

- compress: ture则文件会做gzip压缩

- host：指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下：host: "0.0.0.0"

- port: 服务器端口

- hot:启用 webpack 的模块热替换特性

- lazy:懒惰模式，只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动

- filename：搭配懒惰模式使用，只在某个文件被请求时编译。

- headers：设置响应头

- proxy：可以设置代理转发，处理跨域的一种方式。

3. 刷新方式
- 如果选择inline-mode，则webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口。

4. 基础配置
webpack.config.js
```
const path = require('path');
const root = __dirname;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry:[
        /*'webpack-dev-server/client',*/
        path.resolve(root, 'src/main.js')
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(root, 'dist')
    },
    devServer:{
        contentBase: path.resolve(root, "dist"),
        host:"0.0.0.0", // 或者你本机的ip，不设置这个默认只能localhost访问
        port:9002,
        compress:true
    },
    module: {
        rules: [
            {test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/}
        ]
    },
    plugins:[
        new UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};
```
package.json
```
  "scripts": {
    "dev": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --open"
  },
```
5. 遇到的问题
- node、webpack、webpack-dev-server的兼容性问题。node6.9.1安装的webpack为3.x，安装的webpack-dev-server为3.x，然而webpack-dev-server 3.x 仅兼容webpack 4.x。 解决方法是要么升级node和webpack，要么降级webpack-dev-server为2.x。我选择了升级。
- webpack 4.x 移除了 webpack.optimize.UglifyJsPlugin。 需要独立安装uglifyjs-webpack-plugin插件。

## 模块热替换 HMR
react的热替换需要使用[react-hot-loader插件](https://github.com/gaearon/react-hot-loader)
```
npm install --save-dev react-hot-loader
```
.babelrc文件的变化
```
// .babelrc
{
  "plugins": ["react-hot-loader/babel"]
}
```
webpack.confi.js 的变化
```
   devServer:{
        contentBase: path.resolve(root, "dist"),
        host:"0.0.0.0", // 或者你本机的ip，不设置这个默认只能localhost访问
        port:9002,
        compress:true,
        hot:true
    },
    plugins:[
        ......
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
```
入口文件main.js的变化
```
// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppContainer} from 'react-hot-loader'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        // if you are using harmony modules ({modules:false})
        render(App)
        // in all other cases - re-require App manually
        // render(require('./App'))
    })
}
```
组件App.js的变化
```
//App.js
import React from 'react'
import { hot } from 'react-hot-loader'

const App = () => <div>Hello World! zcp is wonderful</div>

export default hot(module)(App)
```
## 生产环境构建

## 代码分离code spliting 和 懒加载
- 方式一：多入口+CommonsChunkPlugin
- 方式二：动态导入：require.ensure()，dynamic import()

### React中实现代码分离和懒加载
1. babel中需增加babel-plugin-syntax-dynamic-import插件
2. 使用react-loadable
3. 


#### 参考链接
1. [Code Splitting in Create React App](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)
## 如何拆分第三方代码库或项目中的公共库 - CommonsChunkPlugin
## 如何拆分CSS - ExtractTextWebpackPlugin

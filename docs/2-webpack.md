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
## 代码分离code spliting 和 懒加载
### 方式一：多入口+CommonsChunkPlugin
例如：希望将第三方库代码分离，可以将在入口entry配置vender:第三方库的路径，
然后利用commonsChunkPlugin提取公共模块的功能，将第三方库提取到单独的模块中，从而实现代码分离
### 方式二：动态导入：require.ensure()，dynamic import()
- 使用import(module).then(callback)
- webpack配置,修改output项
```
module.exports={
    ...
    output: {
        // `filename` provides a template for naming your bundles (remember to use `[name]`)
        filename: '[name].bundle.js',
        // `chunkFilename` provides a template for naming code-split bundles (optional)
        chunkFilename: '[name].bundle.js',
        // `path` is the folder where Webpack will place your bundles
        path: path.resolve(root, 'dist')
        // `publicPath` is where Webpack will load your bundles from (optional)
        // publicPath: path.resolve(root, 'dist/')
    }
    ...
};
```
- babel配置，需添加babel-plugin-syntax-dynamic-import

### React中实现代码分离和懒加载
1. React Loadable

React Loadable 将动态引入(dynamic import)封装成了一个对 React 友好的 API 来在特定组件下引入代码分割的功能，本质是封装dynamic import的一个高阶组件(HOC)，
它可以创建：加载状态、错误状态、超时、预加载等。
2. 基于路由进行分割

示例：
```
import React from 'react'
import {hot} from 'react-hot-loader'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
    loader: () => import('./pages/Home'),
    loading: Loading,
});

const Sample = Loadable({
    loader: () => import('./pages/Sample'),
    loading: Loading,
});

const App = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/sample" component={Sample}/>
        </Switch>
    </HashRouter>
)

export default hot(module)(App)
```

### 代码分离的参考链接
1. [Code Splitting in Create React App](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)
2. []()

## 生产环境构建
- 为每个环境编写彼此独立的 webpack 配置, 一个通用配置，使用webpack-merge进行合并
- 安装webpack-merger
- webpack.dev.js
```
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
        /*new webpack.NamedModulesPlugin(),*/
        new webpack.HotModuleReplacementPlugin()
    ]
});
```
mode为development时，默认启用了NamedModulesPlugin插件；process.env.NODE_ENV 的值不需要再定义，默认是 development；
- webpack.prod.js
```
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config.js');
/*const UglifyJsPlugin = require('uglifyjs-webpack-plugin');*/

module.exports = merge(base,{
    mode:'production',
    devtool: 'source-map',
    plugins:[
        /*new UglifyJsPlugin({
            sourceMap:true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })*/
    ]
});
```
mode为production时,默认提供所有可能的优化，如代码压缩/作用域提升等;process.env.NODE_ENV 的值不需要再定义，默认是 production;
- npm scripts
```
{
  ...
  "scripts": {
    "dev": "webpack --config webpack.dev.js --watch",
    "build": "webpack --config webpack.prod.js",
    "start": "webpack-dev-server --open --config webpack.dev.js"
  },
  ...
}
```
## 缓存
- chunkhash，将output.filename和output.chunkFilename使用根据chunk内容生产的hansh，即chunkhash
    + webpack-dev-server中入口chunk不允许使用chunkhash，所以仅在生产模式这样配置,开发环境可以使用[hash]或不使用任何hash
        ```
        output: {
        -     filename: 'bundle.js',
        +     filename: '[name].[chunkhash].js',
              path: path.resolve(__dirname, 'dist')
        }
        ```
- contenthash，适用于ExtractTextWebpackPlugin插件，可以保证抽离出来的css没有修改时，生成的contenthash不会改变。
- 抽取公共chunk(webpack4使用了两个新的配置项 optimization.splitChunks 和 optimization.runtimeChunk 代替CommonsChunkPlugin来实现该功能)
    + webpack的runtime和manifest:通过设置 optimization.runtimeChunk: true 来为每一个入口默认添加一个只包含 runtime 的 chunk
        ```
        module.exports = {
            ...
            optimization:{
                    runtimeChunk:true
            },
            ...
        }
        ```
    + 第三方库分离(例如：react、react-dom、react-router-dom等node_modules中的库)
        ```
        module.exports = {
             ...
             optimization:{
                runtimeChunk:true,
                splitChunks:{
                    chunks:'all'
                }
             },
             ...
        }
        ```
    + [再见，CommonsChunkPlugin](https://zhuanlan.zhihu.com/p/34082892)
- module id问题（每个 module.id 会基于默认的解析顺序(resolve order)进行增量，当解析顺序发生变化，ID 也会随之改变），而HashedModuleIdsPlugin插件会根据模块的相对路径生成一个四位数的hash作为模块id, 可以解决module id问题，建议用于生产环境。

## PWA(Progressive Web Application)
- workbox-webpack-plugin
- 在入口文件中注册service worker

## loaders
### 加载图片(url-loader 和 file-loader)
- url-loader 和 file-loader 都可以处理图片
- url-loader在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL
- 仅使用url-loader
小于30k的图片转为DataURL，超过则原样copy到目标文件加下images/目录下
```
{test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=30720&name=images/[name].[ext]?[hash:8]'}
```
- 仅使用file-loader
所有文件均原样copy到目标文件加下images/目录下
```
{test: /\.(png|jpg|gif)$/, use: 'file-loader?name=images/[name].[ext]?[hash:8]'}
```
- 同时使用 url-loader 和 file-loader
不能对同一范围的文件同时使用这个两个loader，需使用exclude/include指定各个loader的处理范围
```
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
```
这样，对于一些上线后允许运维自行处理的图片就可以放在normal目录下。

### 图片压缩
- image-webpack-loader
- imagemin-webpack-plugin

### 生产模式清除console.log
webpack4的production模式并没有对console.log进行清除，可以使用
- strip-loader，可以清除任何你想清除的function
- webpack-clear-console

## 插件
### CSS抽离
- ExtractTextWebpackPlugin
    + 功能：抽取内容到单独的一个文件，例如将webpack默认的内联css抽取到一个单独的css文件
    + 如果是 webpack 3.x 则直接安装 extract-text-webpack-plugin ，4.x 则末尾需要加@next
        ```
        npm install --save-dev extract-text-webpack-plugin@next
        ```
    + 默认只会提取入口文件的css到单独的文件中，并且对每个入口 chunk 都生成一个对应的文件
    + allChunks为true时，会将所依赖的所有chunk的css都提取到该入口文件css中
- mini-css-extract-plugin
    + 功能：抽取css，不同于ExtractTextWebpackPlugin，支持按需加载，可以为每个chunk建立对应的css文件
        ```
        const MiniCssExtractPlugin = require("mini-css-extract-plugin");
        module.exports = {
          plugins: [
            new MiniCssExtractPlugin({
              // Options similar to the same options in webpackOptions.output
              // both options are optional
              filename: "[name].css",
              chunkFilename: "[id].css"
            })
          ],
          module: {
            rules: [
              {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader"
                ]
              }
            ]
          }
        }
        ```
    + 默认为每个chunk建立对应的css，有几个chunk则有几个css，也可以将所有的chunk抽取到一个css文件，增加optimization.splitChunks.cacheGroups的配置
    ```
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true
            }
          }
        }
      },
    ```
    + 如果想为每个入口chunk都生成一个对应的css，也需要特殊处理，见：[extracting-css-based-on-entry](https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-css-based-on-entry)
### 提取公共chunk
- CommonsChunkPlugin，webpack4中已移除
- optimization.splitChunks 和 optimization.runtimeChunk

### optimization.splitChunks
webpack 将在满足以下条件时自动分割 chunks：
- 新的chunk能够被多处引用，或者模块来自node_modules文件夹
- 新的chunk大于30kb（min + gz 之前）
- 按需加载的模块中，并行请求数小于等于5【分割后产生的并行请求】
- 初始页面的并行请求数小于等于3

条件配置共有4个选项：
- minChunks （默认值：1）引用同一模块的最小 chunk 数
- minSize （默认值：30000）chunk 的最小尺寸
- maxAsyncRequests （默认值：5）按需加载模块的最大并行请求数
- maxInitialRequests （默认值：3）入口页面的最大并行请求数

chunks选项
- initial 选择初始chunks
- async  选择按需加载chunks
- all  选择所有chunks，包括initial 和 async

选择模块
- test 选项用来控制缓存组中包含哪些模块。
- 默认情况下将选择所有模块。选项的值可以是正则表达式、字符串或函数。
- 可以通过模块的绝对资源路径或 chunk 名称进行匹配。当一个 chunk 名称匹配时，它包含所有的模块都将被选择。

默认配置
```
splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20
            reuseExistingChunk: true,
        },
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        }
    }
}
```
- 默认情况下，cache groups 继承来自 splitChunks.*的所有选项，但test, priority 和 reuseExistingChunk选项只能在 cache group 级别进行配置。
- cache groups还可以使用这些选项: chunks, minSize, minChunks, maxAsyncRequests, maxInitialRequests, name. 
- 传入false以禁用 default 组：optimization.splitChunks.cacheGroups.default: false
      
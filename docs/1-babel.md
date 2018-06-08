## babel介绍
- babel-cli：命令行转码，例如 babel-cli source.js --out-put target.js
- babel-node：提供一个支持ES6的REPL环境，安装babel-cli时包含了babel-node。
- babel-register：改写require命令，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
- babel-core：使用babel的API进行转码
- babel-polyfill:Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，这时需要使用babel-polyfill。
## babel的配置
- 根目录下建立.babelrc文件
- package.json中有babel选项，例如:"babel":{}
## .babelrc
主要组成由presets和plugins
```
{
  "presets":[],
  "plugins":[]
}
```
## presets
可以简单理解为许多预先配置好的插件的集合
- 主要是语法转义器，对javascript最新的语法糖进行编译，并不负责转译javascript新增的api和全局对象。例如let/const就可以被编译，而includes/Object.assign等并不能被编译
## plugins
每一个插件都对应1-2个比较具体的解析，例如transform-runtime插件可以解析Object.assign()，Promise、Array.from等，详细见[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js).
- 补丁转义器。主要负责转译javascript新增的api和全局对象，类似与babel-polyfill的作用。
## pugins和presets的顺序
- plugins优先于presets进行编译
- plugins按照数组的index增序(从数组第一个到最后一个)进行编译。
- presets按照数组的index倒序(从数组最后一个到第一个)进行编译。
## Vue项目中配置
```
{
  "presets": [
    "es2015",
    "stage-2"
  ],
  "plugins": [
    "transform-runtime"
  ],
  "comments": false
}
```
## React项目中的配置
```
{
  "presets": [
    [ "env", {"modules": false}],
    "stage-2",
    "react"
  ],
  "plugins": [
    "transform-runtime"
  ],
  "comments": false
}
```

## 参考链接
1. https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md
2. https://juejin.im/post/5a79adeef265da4e93116430
3. http://web.jobbole.com/91090/
4. http://www.ruanyifeng.com/blog/2016/01/babel.html

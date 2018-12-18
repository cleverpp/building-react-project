## react同构（服务端渲染）
服务端渲染的目的：1.提升首屏渲染时间(解决白屏问题)。2.seo优化。

同构：在服务端渲染好html返回到browser，browser加载好需要的js后通过React.hydrate绑定相应的交互
### 启动koa2
1. 基于Koa2.
    ```
    npm install --save-dev koa koa-bodyparser koa-router koa-static koa2-cors
    ```

2. babel配置
    node8尚不支持es6的import语法，需要安装babel插件。
    ```
    npm install --save-dev babel-plugin-dynamic-import-node
    ```

    注：[node.js支持es2015情况](https://node.green/)
3. react-loadable [问题：server端和client端均为生效]
    1. server端：Loadable.preloadAll().then(()=> //start server)
    2. client端：Loadable.preloadReady().then(()=> //hydrate component)
4. webpack服务端打包
5. 服务端的路由处理
6. 服务端的redux的使用


## 参考
1. [React-universal-ssr](https://github.com/wd2010/React-universal-ssr)
2. [react-server-rendering-example](https://github.com/petehunt/react-server-rendering-example)
3. [React 中同构（SSR）原理脉络梳理](https://segmentfault.com/a/1190000016722457)
4. [react-article-bucket](https://github.com/liangklfangl/react-article-bucket/blob/master/react-static/index.md)
5. [v2-universal-js-hmr-ssr-react-redux](https://github.com/Alex-ray/v2-universal-js-hmr-ssr-react-redux)
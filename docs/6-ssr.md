## react同构（服务端渲染）
服务端渲染的目的：1.提升首屏渲染时间(解决白屏问题)。2.seo优化。
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
3. webpack - 双端构建
    安装universal-webpack

4. 双端路由

5. view兼容
View 兼容，后端输出 HTML 结构，前端同样输出 HTML 结构，之所以需要选用一套对 DOM 做了抽象化的模板引擎是为了保证前后端最终产生的 DOM 结构一致。而 React 中的 React Server Render 可以使前后端共用同一套代码。


6. ajax兼容

7. 全局变量兼容

8. redux - 数据流兼容

9. 缓存

10. 其它
    1. cross-env
    2. nodemon


## 参考
1. [React-universal-ssr](https://github.com/wd2010/React-universal-ssr)
2.
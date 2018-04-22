## React Router V4
慎重选择版本，V4与之前的版本有很大的变化。V2和V3之间差别不大，V4相较于他们具备动态路由的能力。

区别一：web应用的话，需要安装的是react-router-dom，它包含了react-router。

区别二：V4中Router不允许路由嵌套。V3可以。注意：<Router>组件下只允许存在一个子元素，如存在多个则会报错。

区别三：没有了hashHistory。

区别四：新版的路由为<Route>提供了三种渲染内容的方法，其中注意<Route component>的优先级要比<Route render>高，所以不要在同一个<Route>中同时使用这两个属性。

## 让react-router跑起来
安装
```
npm install react-router-dom
```
最简单的使用
```
import {BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom';
import React, {Component} from 'react';
import App from './App';
import First from './first';
import Second from './second';

class MyRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">App</Link></li>
                        <li><Link to="/first">First</Link></li>
                        <li><Link to="/second">second</Link></li>
                    </ul>

                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/first" component={First}/>
                        <Route path="/second" component={Second}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
```

## 参考链接
1. [React Router v4 几乎误我一生 - 知乎专栏](https://zhuanlan.zhihu.com/p/27433116)
2. [React Router v4 入坑指南- 简书](https://www.jianshu.com/p/6a45e2dfc9d9)
3. [V4中文文档](https://github.com/react-translate-team/react-router-CN)
4. [Migrating from v2/v3 to v4](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/migrating.md)

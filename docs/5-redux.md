## 状态管理

项目中为什么需要状态管理？
- 一些数据需要共享,例如：用户的状态。
- 跨组件通信的解决方式之一。

其它的解决方案：react的context api

## Redux
>Redux is a predictable state container for JavaScript apps.

概念一：store
- store中包含所有数据，通过store.getState()获取当前state
- 只能通过store.dispatch(action)来改变store中的数据
- store.subscribe(listener):注册一个监听者，它在store发生变化时被调用

概念二：action & actionCreator
- Action 就是 View 发出的通知，表示 State 应该要发生变化了
- 定义一个函数来生成 Action，这个函数就叫 Action Creator

概念三：reducer(prevState,action)=>newState
- 生成新state的纯函数
- store.dispatch方法会触发 Reducer 的自动执行

概念四：redux的中间件，例如redux-thunk
- 中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能

## 如何应用到React项目中
项目场景：第三方APP跳转到H5页面，将经纬度信息作为查询参数传入。项目中很多的页面都需要经纬度信息。

方案：将经纬度信息存储在Redux Store中

1. 安装redux、react-redux、redux-thunk
```
npm install -S redux react-redux react-thunk
```
2. 创建一个store
```
import { createStore，combineReducers } from 'redux';
import * as reducers from './reducers'

// 方式1：只有reducer
const store = createStore(reducer);

// 方式2：有reducer和初始状态
const store = createStore(reducer, preloadedState)

// 方式3：reducer进行了拆分，需要合并reducer
const store = createStroe(combineReducers(reducers));

// 方式4：使用了中间件
const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
);

```
3. 创建reducer
```
export const rootLocationInfo = (
    state = {
        latitude: '',//维度31.233858
        longitude: '',//经度121.663881
    }, action = {}) => {
    let payload = action.payload;
    switch (action.type) {
        case "ROOTLOCATIONINFO" : {
            return {
                ...state,
                ...payload
            }
        }
        default:
            return state;
    }
};
```
4. 创建actionCreator
```
export const ROOTLOCATIONINFO = 'ROOTLOCATIONINFO';

export const rootLocationInfoAction = (payload = {}) => {
    return {
        type: ROOTLOCATIONINFO,
        payload: payload
    }
}
```
5. 应用react-redux
   - Provider
   - 在根组件App处，获取查询参数并dispatch
   - connect，封装UI组件，使其成为容器组件
```
// 根组件App.js
class App extends React.Component {
    componentDidMount() {
        let query = util.url2Obj(this.props.search);
        console.log(query);
        store.dispatch(rootLocationInfoAction({
            latitude: query.lat,
            longitude: query.lon
        }))
    }

    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/sample" component={Sample}/>
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}

// container.js
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        rootLocationInfo: state.rootLocationInfo
    }
};

const container = (component) => withRouter(connect(mapStateToProps)(component));

export default container;

// 将UI组件Home封装成容器组件
// home.js
import container from '../store/container';
class Home extends React.Component {
    componentDidMount() {
        console.log(this.props.rootLocationInfo);
    }

    render() {
        return (
            <div>
                <p>Hello,Welcome to Home</p>
            </div>
        );
    }

}

export default container(Home);
```
## 热加载
reducer的热加载问题，见[官方release说明](https://github.com/reduxjs/react-redux/releases/tag/v2.0.0)

不使用热加载
```
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {rootLocationInfo} from './reducers/locationReducer';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
const store = createStore(
    combineReducers({rootLocationInfo})
);


let unsubscribe = store.subscribe(() => { //监听状态的变化
        console.log("state changed");
        console.log(store.getState());
    }
);

export default store;
```

需要使用热加载，增加下面代码
```
...

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./reducers/locationReducer', () => {
        const rootLocationInfo = require('./reducers/locationReducer');
        store.replaceReducer(rootLocationInfo);
    })
}

export default store;
```

## 参考
1. [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
2. [Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
3. [Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
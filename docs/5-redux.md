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
4. 创建actionCreator
5. 应用react-redux



## 参考
1. [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
2. [Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
3. [Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
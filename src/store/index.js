/**
 * Created on 2018/6/20.
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {rootLocationInfo} from './reducers/locationReducer';
import thunk from 'redux-thunk';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
const store = createStore(
    combineReducers({rootLocationInfo}),
    applyMiddleware(thunk)
);


let unsubscribe = store.subscribe(() => { //监听状态的变化
        console.log("state changed");
        console.log(store.getState());
    }
);

export default store;
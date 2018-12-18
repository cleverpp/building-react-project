/**
 * Created by cleverzhang on 2018/3/7.
 */
import React from 'react'
import {hot} from 'react-hot-loader'
import {HashRouter, BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'

import {Provider} from 'react-redux'
import configureStore from './store/index';
import util from './modules/util';
import {rootLocationInfoAction} from './store/action/locationAction'
import routersConfig from './router/index'
import Loadable from "react-loadable";

const initialState = window && window.__INITIAL_STATE__;
let store = configureStore(initialState);

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
        let modules = [];
        return (
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            {
                                routersConfig.map(route => (
                                    <Route key={route.path} exact={route.exact} path={route.path}
                                           component={route.component}/>
                                ))
                            }
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </Loadable.Capture>
        )
    }
}

export default hot(module)(App)

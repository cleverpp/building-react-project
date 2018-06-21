/**
 * Created by cleverzhang on 2018/3/7.
 */
import React from 'react'
import {hot} from 'react-hot-loader'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
import './App.css'

import {Provider} from 'react-redux'
import store from './store/index';
import util from './modules/util';
import {rootLocationInfoAction} from './store/action/locationAction'


const Loading = () => <div>Loading...</div>;
const lazyload = (component) => Loadable({loader: component, loading: Loading});

const Home = lazyload(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const Sample = lazyload(() => import(/* webpackChunkName: "Sample" */'./pages/Sample'));

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

export default hot(module)(App)

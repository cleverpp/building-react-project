/**
 * Created by cleverzhang on 2018/3/7.
 */
import React from 'react'
import {hot} from 'react-hot-loader'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
import './App.css'

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

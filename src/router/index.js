/**
 * Created on 2018/11/23.
 */
import React from 'react'
import Loadable from 'react-loadable'

const Loading = () => <div>Loading...</div>;
const lazyload = (component) => Loadable({loader: component, loading: Loading});

const Home = lazyload(() => import(/* webpackChunkName: "Home" */ '../pages/Home'));
const Sample = lazyload(() => import(/* webpackChunkName: "Sample" */'../pages/Sample'));


const routesConfig = [{
    path: '/index',
    exact: true,
    component: Home
}, {
    path: '/sample',
    component: Sample,
}]

export default routesConfig;
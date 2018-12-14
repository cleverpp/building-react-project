/**
 * Created on 2018/11/23.
 */
import {Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'

const Loading = () => <div>Loading...</div>;
const lazyload = (component) => Loadable({loader: component, loading: Loading});

const Home = lazyload(() => import(/* webpackChunkName: "Home" */ '../pages/Home'));
const Sample = lazyload(() => import(/* webpackChunkName: "Sample" */'../pages/Sample'));

const routersConfig = (RouterComponent) => {
    return (
        <RouterComponent>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/sample" component={Sample}/>
            </Switch>
        </RouterComponent>
    )
};

export default routersConfig;
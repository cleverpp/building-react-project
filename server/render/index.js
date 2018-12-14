/**
 * Created on 2018/11/22.
 */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {Route, StaticRouter, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from '../../src/store/index'
import Home from '../../src/pages/Home'
import Sample from '../../src/pages/Sample'

const render = async (ctx, next) => {
    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.url} context={{}}>
                <Switch>
                    <Route path="/index" component={Home}/>
                    <Route path="/sample" component={Sample}/>
                </Switch>
            </StaticRouter>
        </Provider>
    );
    return html;
}

export default render;
/**
 * Created on 2018/11/22.
 */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {Route, StaticRouter, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';

import routesConfig from '../../src/router/index'
import configureStore from '../../src/store/index'
import stats from '../../dist/react-loadable.json';

import path from 'path';
import fs from 'fs'

const createTags = (modules) => {
    let bundles = getBundles(stats, modules);
    let scriptfiles = bundles.filter(bundle => bundle.file.endsWith('.js'));
    let stylefiles = bundles.filter(bundle => bundle.file.endsWith('.css'));
    let scripts = scriptfiles.map(script => `<script src="/${script.file}"></script>`).join('\n');
    let styles = stylefiles.map(style => `<link href="/${style.file}" rel="stylesheet"/>`).join('\n');
    return {scripts, styles}
}

const render = async (ctx, next) => {
    let store = configureStore();
    let initState = store.getState();
    let modules = [];
    const rootString = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={store}>
                <StaticRouter location={ctx.url} context={{}}>
                    <Switch>
                        {
                            routesConfig.map(route => (
                                <Route key={route.path} exact={route.exact} path={route.path}
                                       component={route.component}/>
                            ))
                        }
                    </Switch>
                </StaticRouter>
            </Provider>
        </Loadable.Capture>
    );

    console.log(rootString);
    console.log(modules);

    let {scripts, styles} = createTags(modules);
    console.log(scripts);
    console.log(styles);

    let TEMPLATE = fs.readFileSync(path.join(path.resolve(__dirname, '../../dist'), 'index.html'), {encoding: 'utf8'});
    TEMPLATE = TEMPLATE.replace('</head>', `\n ${styles}</head>`);
    TEMPLATE = TEMPLATE.replace('<div id="root"></div>', `<div id="root">${rootString}</div>`);
    TEMPLATE = TEMPLATE.replace('<body>', `<body> \n <script>window.__INITIAL_STATE__ =${JSON.stringify(initState)}</script>`);
    TEMPLATE = TEMPLATE.replace('</body>', `${scripts}</body>`);

    ctx.body = TEMPLATE;
}

export default render;
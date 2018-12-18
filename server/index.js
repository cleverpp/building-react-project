/**
 * Created on 2018/11/19.
 */
require('./ignore.js')();
require('babel-polyfill');
require('babel-register')({
    presets: ['env', 'react', 'stage-2'],
    plugins: ['react-loadable/babel', 'syntax-dynamic-import', "dynamic-import-node"]
});

const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticServer = require('koa-static');
const cors = require('koa2-cors');
const Loadable = require('react-loadable');

const routerIndex = require('./routers/index');
const projDir = path.join(path.resolve(__dirname,'../dist'));
const port = process.env.port || 9090;

const app = new Koa();

// 静态服务器
app.use(staticServer(projDir));

app.use(cors());
app.use(bodyParser());

app.use(routerIndex.routes()).use(routerIndex.allowedMethods());

Loadable.preloadAll().then(() => {
    app.listen(port, () => {
        console.log(`\nListening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
    })
})
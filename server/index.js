/**
 * Created on 2018/11/19.
 */
require('./ignore.js')();
require('babel-polyfill');
require('babel-register')({
    presets: ['env', 'react', 'stage-2'],
    plugins: ['syntax-dynamic-import', "dynamic-import-node"]
});

const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const cors = require('koa2-cors');

const routerIndex = require('./routers/index');
const projDir = path.join(__dirname + '../../dist');

const app = new Koa();

// 静态服务器
app.use(serve(projDir));

app.use(cors());
app.use(bodyParser());

app.use(async (ctx, next) => {
    let html = await next();
    let PLACEHOLDER = 'If you see this then something is wrong.';
    let TEMPLATE = fs.readFileSync(projDir + '/index.html', {encoding: 'utf8'});
    ctx.body = TEMPLATE.replace(PLACEHOLDER, html);
})
app.use(routerIndex.routes()).use(routerIndex.allowedMethods());

app.listen(9090, () => {
    console.log('The server is running at http://localhost:' + 9090 + '/index')
})
/**
 * Created on 2018/11/22.
 */
const Router = require('koa-router');
const render = require('../render/index').default;

const router = new Router();

router.get('*', render);

module.exports = router;
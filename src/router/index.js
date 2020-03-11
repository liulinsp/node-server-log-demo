/**
 * 路由
 */
const KoaRouter = require('koa-router');
const user = require('./user');

const router = new KoaRouter();
router.get('/', (ctx, next) => {
    console.log('do welcome');
    ctx.body = {
        msg: 'Welcome'
    }
})
router.use('/users', user.routes(), user.allowedMethods());

module.exports = router;

/**
 * 服务入口文件 - 使用日志中间件
 */
const Koa = require('koa');
const router = require('./router');
const log = require('./middleware/log');

const port = 3000;

const app = new Koa()
    .use(log())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
});

console.log('这是degug日志');
console.info('这是info日志');
console.warn('这是warn日志');
console.error('这是error日志');

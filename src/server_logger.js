/**
 * 服务入口文件 - 使用日志对象
 */
const Koa = require('koa');
const router = require('./router');
const logger = require('./util/log4jsLogger');

const port = 3000;

const app = new Koa()
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});

logger.trace('这是trace日志');
logger.debug('这是degug日志');
logger.info('这是info日志');
logger.warn('这是warn日志');
logger.error('这是error日志');
logger.fatal('这是fatal日志');
logger.mark('这是mark日志');

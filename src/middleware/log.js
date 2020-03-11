/**
 * 日志中间件
 */
// const logger = require('../util/winstonLogger');
const logger = require('../util/log4jsLogger');

/**
 * 创建日志代理方法
 * @param logLevel 日志级别
 * @param loggers 日志对象或日志对象数组
 * @return {function}
 */
function createLogProxy (logLevel, loggers) {
    if (!(loggers instanceof Array)) {
        loggers = [loggers];
    }
    return (...param) => {
        loggers.forEach( logger => {
            logger[logLevel](...param);
        });
    };
}

module.exports = function log () {

    console.log = createLogProxy('debug', logger);
    console.info = createLogProxy('info', logger);
    console.warn = createLogProxy('warn', logger);
    console.error = createLogProxy('error', logger);

    return async(ctx, next) => {
        // 请求开始时间
        const start = new Date().getTime();

        await next();

        // 请求耗时
        const ms = new Date().getTime() - start;

        // 根据响应状态设置日志级别
        let logLevel;
        if (ctx.status >= 500) {
            logLevel = 'error';
        } else if (ctx.status >= 400) {
            logLevel = 'warn';
        } else if (ctx.status >= 100) {
            logLevel = 'info';
        }

        // 日志信息
        const msg = `${ctx.method} [${ctx.status}] ${ms}ms ${decodeURI(ctx.originalUrl)}`;

        // 输出日志
        console[logLevel](msg);
    }
}

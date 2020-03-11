/**
 * log4js 增加单独错误日志
 * @see https://log4js-node.github.io/log4js-node/
 */
const path = require('path');
const log4js = require('log4js');

// 配置log4js
log4js.configure({
    appenders: {
        // 控制台输出
        console: { type: 'console' },
        // 全部日志文件
        allFile: { type: 'file', filename: path.join(__dirname, '../../logs/server.log')},
        // 错误日志文件
        errorFile: { type: 'file', filename: path.join(__dirname, '../../logs/server-error.log')}
    },
    categories: {
        // 默认日志
        default: { appenders: [ 'allFile', 'console' ], level: 'debug' },
        // 错误级别日志
        error: { appenders: [ 'errorFile' ], level: 'error' },
    }
});

// 获取默认日志
const defaultLogger = log4js.getLogger();
// 获取错误级别日志
const errorLogger = log4js.getLogger('error');

// 日志代理，同时调用默认日志和错误日志
const loggerProxy = {};
const levels = log4js.levels.levels;
levels.forEach(level => {
    const curLevel = level.levelStr.toLowerCase();
    loggerProxy[curLevel] = (...params) => {
        defaultLogger[curLevel](...params);
        errorLogger[curLevel](...params);
    }
});

module.exports = loggerProxy;
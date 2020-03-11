/**
 * log4js日志
 * @see https://log4js-node.github.io/log4js-node/
 */
const path = require('path');
const log4js = require('log4js');

// 定义日志格式
const layout = {
    type: 'pattern',
    pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %m'
};

// 日志配置
const logConfig = {
    appenders: {
        console: { type: 'console' },
        allFile: { type: 'dateFile', filename: path.join(__dirname, '../../logs/all.log'), pattern: '.yyyy-MM-dd-hh', layout },
        errorFile: { type: 'dateFile', filename: path.join(__dirname, '../../logs/error.log'), pattern: '.yyyy-MM-dd-hh', layout },
    },
    categories: {
        default: { appenders: [ 'allFile', 'console' ], level: 'debug' },
        error: { appenders: [ 'errorFile' ], level: 'error' }
    }
};

log4js.configure(logConfig);
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

/**
 * winston日志
 * @see https://github.com/winstonjs/winston
 */
const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf } = format;
require('winston-daily-rotate-file');

// 所有日志输出
const allTransport = new (transports.DailyRotateFile)({
    filename: path.join(__dirname, '../../logs/all%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH-mm',
    zippedArchive: false,
    maxSize: '100m',
    maxFiles: '14d',
    level: 'debug'
});

// 错误日志输出
const errorTransport = new (transports.DailyRotateFile)({
    filename: path.join(__dirname, '../../logs/error%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH-mm',
    zippedArchive: false,
    maxSize: '100m',
    maxFiles: '14d',
    level: 'error'
});

// 创建日志对象
const logger = createLogger({
    level: 'info',
    // 日志格式
    // format: format.json(),
    format: combine(
        // colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
        printf(info => `${info.timestamp} [${info.service}] ${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: 'demo-service' },
    transports: [
        new transports.Console(),
        allTransport,
        errorTransport
        // error 及以上级别的日志输出到 logs/error.log 文件
        // new transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
        // 所有日志输出到 logs/error.log 文件
        // new transports.File({ filename: path.join(__dirname, '../../logs/all.log') })
    ]
});

module.exports = logger;
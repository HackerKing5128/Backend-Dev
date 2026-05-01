const winston = require('winston');

// Determine log level based on environment
// debug for dev, info for staging, error for production
let logLevel = 'debug';
if (process.env.NODE_ENV === 'staging') logLevel = 'info';
if (process.env.NODE_ENV === 'production') logLevel = 'error';
// Override if explicitly set
if (process.env.LOG_LEVEL) logLevel = process.env.LOG_LEVEL;

const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// In production, we might add a file transport or send logs to CloudWatch/Splunk
if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }));
}

module.exports = logger;

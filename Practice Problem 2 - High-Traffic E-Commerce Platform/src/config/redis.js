const { createClient } = require('redis');
const logger = require('./logger');

let redisClient;

const initRedis = async () => {
    redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (err) => logger.error(`Redis Client Error: ${err.message}`));
    redisClient.on('connect', () => logger.info('Redis Client Connected'));

    await redisClient.connect();
    return redisClient;
};

const getClient = () => redisClient;

module.exports = { initRedis, getClient };

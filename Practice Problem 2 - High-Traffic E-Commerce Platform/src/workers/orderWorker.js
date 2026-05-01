const { Worker } = require('bullmq');
const logger = require('../config/logger');

// Worker to process queued orders when payment gateway comes back up
const orderWorker = new Worker('OrderProcessingQueue', async job => {
    logger.info(`Processing queued order: ${job.id}`);
    
    // Attempt payment processing again here...
    // If it fails, BullMQ will automatically retry based on the backoff strategy.

    return { status: 'processed' };
}, {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }
});

orderWorker.on('completed', job => {
    logger.info(`Job ${job.id} has completed!`);
});

orderWorker.on('failed', (job, err) => {
    logger.error(`Job ${job.id} has failed with ${err.message}`);
});

module.exports = orderWorker;

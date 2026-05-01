const { Queue } = require('bullmq');

// Message queue for order processing (to handle payment gateway failures)
const orderQueue = new Queue('OrderProcessingQueue', {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }
});

const addOrderToQueue = async (orderData) => {
    await orderQueue.add('processOrder', orderData, {
        attempts: 5,
        backoff: {
            type: 'exponential',
            delay: 5000 // 5s, 25s, 125s...
        }
    });
};

module.exports = { orderQueue, addOrderToQueue };

const express = require('express');
const router = express.Router();
const { paymentCircuitBreaker } = require('../utils/circuitBreaker');
const { addOrderToQueue } = require('../queue/orderQueue');
const logger = require('../config/logger');

router.post('/', async (req, res) => {
    try {
        const orderData = req.body;
        
        // 1. Inventory Reservation Logic (Simulated)
        // In reality, use atomic Redis operations or DB transactions
        logger.info('Reserving inventory...');

        // 2. Attempt Payment via Circuit Breaker
        const paymentResult = await paymentCircuitBreaker.fire(orderData);

        if (paymentResult.status === 'queued') {
            // Circuit is open/payment failed: Queue the order
            await addOrderToQueue(orderData);
            return res.status(202).json({
                message: 'High traffic or payment gateway unavailable. Your order has been queued and will be processed shortly.',
                status: 'pending'
            });
        }

        res.status(200).json({
            message: 'Checkout successful',
            transactionId: paymentResult.transactionId
        });
    } catch (err) {
        logger.error(`Checkout error: ${err.message}`);
        res.status(500).json({ error: 'Checkout process failed' });
    }
});

module.exports = router;

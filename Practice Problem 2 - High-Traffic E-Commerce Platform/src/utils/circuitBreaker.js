const CircuitBreaker = require('opossum');
const logger = require('../config/logger');

const breakerOptions = {
    timeout: 3000, // If function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit
    resetTimeout: 30000 // After 30 seconds, try again
};

// Example external payment gateway mock
const mockPaymentService = async (orderData) => {
    // Simulate potential failure
    if (Math.random() < 0.1) {
        throw new Error('Payment Gateway Timeout/Failure');
    }
    return { status: 'success', transactionId: `txn_${Date.now()}` };
};

const paymentCircuitBreaker = new CircuitBreaker(mockPaymentService, breakerOptions);

paymentCircuitBreaker.fallback(() => {
    // If the circuit is open (gateway down), we fallback to queuing the order
    logger.warn('Payment Gateway is down. Fallback triggered: Queuing order for later processing.');
    return { status: 'queued', message: 'Payment gateway unavailable. Order queued.' };
});

module.exports = { paymentCircuitBreaker };

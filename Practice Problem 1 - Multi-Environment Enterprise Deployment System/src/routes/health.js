const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const logger = require('../config/logger');

router.get('/', (req, res) => {
    try {
        // Check database connection status
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        
        const healthData = {
            status: 'ok',
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            database: dbStatus
        };

        // If DB is disconnected in prod, we might want to return 503
        if (dbStatus !== 'connected' && process.env.NODE_ENV === 'production') {
            res.status(503).json(healthData);
            return;
        }

        res.status(200).json(healthData);
    } catch (error) {
        logger.error(`Health check failed: ${error.message}`);
        res.status(500).json({ status: 'error', message: 'Health check failed' });
    }
});

module.exports = router;

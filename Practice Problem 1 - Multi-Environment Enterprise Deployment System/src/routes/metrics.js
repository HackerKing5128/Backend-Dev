const express = require('express');
const router = express.Router();

// Mock metrics endpoint
// In a real application, this would pull from a store (e.g., Prometheus registry, Redis, or APM)
router.get('/', (req, res) => {
    // Simulated metrics meeting the requirement:
    // Production must handle 10,000 requests/min, response time < 200ms for 95%
    const mockMetrics = {
        requestsPerMinute: Math.floor(Math.random() * 2000) + 8000, // 8k to 10k
        p95ResponseTimeMs: Math.floor(Math.random() * 50) + 100,    // 100ms to 150ms
        activeConnections: Math.floor(Math.random() * 500) + 100,
        memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
    };

    res.status(200).json(mockMetrics);
});

module.exports = router;

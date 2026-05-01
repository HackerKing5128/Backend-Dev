const express = require('express');
const router = express.Router();
const { getClient } = require('../config/redis');
const logger = require('../config/logger');

// Simulated products
const mockProducts = [
    { id: 1, name: 'Laptop', stock: 50 },
    { id: 2, name: 'Phone', stock: 100 }
];

router.get('/', async (req, res) => {
    try {
        const redisClient = getClient();
        if (redisClient) {
            const cachedProducts = await redisClient.get('products');
            if (cachedProducts) {
                return res.json({ source: 'cache', data: JSON.parse(cachedProducts) });
            }
        }

        // Simulating DB fetch
        const products = mockProducts;

        if (redisClient) {
            // Cache for 60 seconds
            await redisClient.setEx('products', 60, JSON.stringify(products));
        }

        res.json({ source: 'db', data: products });
    } catch (err) {
        logger.error(`Product fetch error: ${err.message}`);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

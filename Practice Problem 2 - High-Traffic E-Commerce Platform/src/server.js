const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { initRedis } = require('./config/redis');
const logger = require('./config/logger');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Connections
connectDB();
initRedis().catch(err => logger.error('Redis init failed', err));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/checkout', require('./routes/checkout'));

// Static assets (CDN Configuration simulation)
// In production, assets are served directly from Cloudflare/Cloudfront
// Using a middleware to redirect if not coming from CDN (example)
app.use('/static', (req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-host'] !== process.env.CDN_DOMAIN) {
        // Force redirect to CDN
        return res.redirect(`https://${process.env.CDN_DOMAIN}${req.originalUrl}`);
    }
    next();
}, express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

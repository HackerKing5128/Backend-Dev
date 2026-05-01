const express = require('express');
const dotenv = require('dotenv');
const logger = require('./config/logger');
const connectDB = require('./config/db');

// Load env vars based on NODE_ENV, default to development
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Middleware to simulate performance metrics gathering
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.debug(`Request ${req.method} ${req.url} took ${duration}ms`);
        // In a real app, send duration to APM tools like DataDog or New Relic
    });
    next();
});

// Routes
app.use('/api/health', require('./routes/health'));
app.use('/api/metrics', require('./routes/metrics'));

// Root endpoint
app.get('/', (req, res) => {
    res.send(`Server running in ${process.env.NODE_ENV} mode.`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`Error processing request: ${err.message}`, { stack: err.stack });
    res.status(500).json({ success: false, message: 'Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

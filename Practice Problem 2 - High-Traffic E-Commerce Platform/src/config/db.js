const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
    try {
        // High-Traffic E-Commerce Setup
        // Using connection pooling to handle massive concurrent requests
        const poolSize = process.env.NODE_ENV === 'production' ? 100 : 10;
        
        if (!process.env.DB_URI) {
            logger.warn('DB_URI not set. Running in mock mode.');
            return;
        }

        await mongoose.connect(process.env.DB_URI, {
            maxPoolSize: poolSize, // Maintain up to 100 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        
        logger.info(`MongoDB Atlas connected with poolSize: ${poolSize}`);
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
    }
};

module.exports = connectDB;

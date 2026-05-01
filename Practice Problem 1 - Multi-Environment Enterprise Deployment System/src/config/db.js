const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
    try {
        if (!process.env.DB_URI) {
            logger.warn('DB_URI not provided. Skipping DB connection (Mock mode).');
            return;
        }
        const conn = await mongoose.connect(process.env.DB_URI, {
            // Options are generally handled by driver defaults in newer mongoose versions
        });
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
        // Exit process with failure in production, but we don't want to crash dev unnecessarily if just mocking
        if (process.env.NODE_ENV === 'production') {
            process.exit(1); 
        }
    }
};

module.exports = connectDB;

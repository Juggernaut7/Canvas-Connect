// server/config/db.js
// This file handles the connection to your MongoDB database using Mongoose.

const mongoose = require('mongoose');

// Configuration for retry logic
const MAX_RETRIES = 5; // Maximum number of connection attempts
const RETRY_INTERVAL_MS = 5000; // Time to wait between retries (5 seconds)

let currentRetries = 0; // Counter for current retry attempts

const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        currentRetries = 0; // Reset retry counter on successful connection
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);

        // Implement retry logic
        if (currentRetries < MAX_RETRIES) {
            currentRetries++;
            console.log(`Attempting to reconnect to MongoDB (Retry ${currentRetries}/${MAX_RETRIES})...`);
            // Wait for a specified interval before retrying
            setTimeout(connectDB, RETRY_INTERVAL_MS);
        } else {
            // If max retries reached, log a critical error and exit the process
            console.error('Max MongoDB connection retries reached. Exiting process.');
            process.exit(1); // Exit with a non-zero code indicating a critical error
        }
    }
};

module.exports = connectDB;

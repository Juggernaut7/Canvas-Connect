// server/server.js
// This is the main entry point for your Node.js/Express backend server.

const express = require('express');
const http = require('http'); // Node.js built-in HTTP module
const cors = require('cors');
const dotenv = require('dotenv'); // For loading environment variables
const connectDB = require('./config/db'); // Database connection
const roomRoutes = require('./routes/roomRoutes'); // API routes for rooms
const { initSocket } = require('./services/socketService'); // Socket.IO service

// Load environment variables from .env file
dotenv.config();
// Connect to MongoDB
connectDB();


const app = express();
const server = http.createServer(app); // Create HTTP server for Express and Socket.IO

// Middleware
// Enable CORS for ANY origin
// WARNING: Using '*' in production can be a security risk.
// For production, specify exact origins (e.g., process.env.CORS_ORIGIN)
// or a list of allowed origins.
app.use(cors({
    origin: '*', // <--- MODIFIED: Allows requests from any origin
    credentials: true,
}));
app.use(express.json()); // Body parser for JSON requests

// API Routes
app.use('/api/rooms', roomRoutes);

// Initialize Socket.IO with the HTTP server and CORS origin
// Note: Socket.IO's CORS also needs to be updated if you want it to accept '*'
initSocket(server, '*'); // <--- MODIFIED: Pass '*' to Socket.IO init as well

// Basic route for testing server status
app.get('/', (req, res) => {
    res.send('CanvasConnect Backend API is running!');
});

const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
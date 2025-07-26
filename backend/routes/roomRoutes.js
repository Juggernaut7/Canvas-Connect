// server/routes/roomRoutes.js
// This file defines the API routes for room management.

const express = require('express');
const router = express.Router();
const { createRoom, getRoomHistory } = require('../controllers/roomController');

// Define routes and link them to controller functions
router.post('/', createRoom); // Route to create a new room
router.get('/:roomId', getRoomHistory); // Route to get drawing history of a room

module.exports = router;

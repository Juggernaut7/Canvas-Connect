// server/controllers/roomController.js
// This file contains the logic for handling API requests related to whiteboard rooms.

const Room = require('../models/Room');
const { v4: uuidv4 } = require('uuid'); // For generating unique room IDs

// @desc    Create a new whiteboard room
// @route   POST /api/rooms
// @access  Public
const createRoom = async (req, res) => {
    try {
        // Generate a unique, short, and human-readable room ID
        const roomId = uuidv4();

        const newRoom = new Room({
            roomId,
            drawingHistory: [], // New rooms start with an empty drawing history
        });

        const createdRoom = await newRoom.save();
        res.status(201).json({ roomId: createdRoom.roomId }); // Respond with the created room ID
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Server error when creating room' });
    }
};

// @desc    Get drawing history for a specific room
// @route   GET /api/rooms/:roomId
// @access  Public
const getRoomHistory = async (req, res) => {
    try {
        const room = await Room.findOne({ roomId: req.params.roomId });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json(room.drawingHistory); // Respond with the drawing history
    } catch (error) {
        console.error('Error fetching room history:', error);
        res.status(500).json({ message: 'Server error when fetching room history' });
    }
};

module.exports = {
    createRoom,
    getRoomHistory,
};

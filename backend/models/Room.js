// server/models/Room.js
// This file defines the Mongoose schema and model for a whiteboard room.

const mongoose = require('mongoose');

// Define the schema for a single drawing stroke
const DrawingStrokeSchema = mongoose.Schema({
    // Store drawing data as a flexible JSON object
    // This allows for various drawing types (line, circle, text later)
    data: {
        type: Object,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now, // Automatically record when the stroke was made
    },
});

// Define the schema for a whiteboard room
const RoomSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true, // Ensure each room has a unique ID
    },
    drawingHistory: [DrawingStrokeSchema], // An array of drawing strokes
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Mongoose model based on the schema
const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;

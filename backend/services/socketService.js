// server/services/socketService.js
// This file sets up and manages the Socket.IO server and its event handlers.

const { Server } = require('socket.io');
const Room = require('../models/Room'); // Import the Room model

let io; // Declare io outside to be accessible by other functions

const initSocket = (httpServer, corsOrigin) => {
    // Initialize Socket.IO server with CORS configuration
    io = new Server(httpServer, {
        cors: {
            origin: corsOrigin, // Allow requests from our React frontend
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    // Event listener for new client connections
    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        // Handle 'joinRoom' event: client wants to join a specific whiteboard room
        socket.on('joinRoom', async ({ roomId, username }) => {
            console.log(`${username} (${socket.id}) attempting to join room: ${roomId}`);

            let room = await Room.findOne({ roomId });

            if (!room) {
                room = new Room({ roomId, drawingHistory: [] });
                await room.save();
                console.log(`Room ${roomId} created on join.`);
            }

            socket.join(roomId); // Add the socket to the specified room
            console.log(`${username} (${socket.id}) joined room: ${roomId}`);

            // Emit the existing drawing history to the newly joined client
            socket.emit('loadDrawing', room.drawingHistory);

            // Notify others in the room that a new user has joined
            socket.to(roomId).emit('userJoined', { username, socketId: socket.id });
        });

        // Handle 'drawing' event: client sends new drawing data
        socket.on('drawing', async ({ roomId, strokeData }) => {
            // Broadcast the drawing data to all other clients in the same room
            socket.to(roomId).emit('drawing', strokeData);

            // Save the stroke to the database
            try {
                await Room.updateOne(
                    { roomId },
                    { $push: { drawingHistory: { data: strokeData } } } // Push new stroke data
                );
            } catch (error) {
                console.error(`Error saving drawing stroke for room ${roomId}:`, error);
            }
        });

        // NEW: Handle 'clearCanvas' event
        socket.on('clearCanvas', async ({ roomId }) => {
            console.log(`Clearing canvas for room: ${roomId}`);
            try {
                // Update the room in DB to have an empty drawing history
                await Room.updateOne({ roomId }, { $set: { drawingHistory: [] } });
                // Broadcast an empty history to all clients in the room to clear their canvases
                io.to(roomId).emit('loadDrawing', []);
            } catch (error) {
                console.error(`Error clearing canvas for room ${roomId}:`, error);
            }
        });

        // NEW: Handle 'undoLastStroke' event
        socket.on('undoLastStroke', async ({ roomId }) => {
            console.log(`Attempting to undo last stroke for room: ${roomId}`);
            try {
                const room = await Room.findOne({ roomId });
                if (room && room.drawingHistory.length > 0) {
                    // Remove the last stroke from the array
                    room.drawingHistory.pop();
                    await room.save(); // Save the updated room document
                    // Broadcast the updated history to all clients in the room
                    io.to(roomId).emit('loadDrawing', room.drawingHistory);
                } else {
                    console.log(`No strokes to undo in room: ${roomId}`);
                }
            } catch (error) {
                console.error(`Error undoing last stroke for room ${roomId}:`, error);
            }
        });

        // NEW: Handle 'chatMessage' event
        socket.on('chatMessage', ({ roomId, message, username }) => {
            console.log(`Chat message in room ${roomId} from ${username}: ${message}`);
            // Broadcast the message to all clients in the same room
            io.to(roomId).emit('chatMessage', { username, message, timestamp: Date.now() });
            // Note: Chat messages are NOT persisted in the DB for contest speed.
        });


        // Handle 'disconnect' event: client disconnects
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    console.log('Socket.IO server initialized.');
};

// Function to get the Socket.IO instance (if needed elsewhere)
const getIo = () => {
    if (!io) {
        throw new Error('Socket.IO not initialized! Call initSocket first.');
    }
    return io;
};

module.exports = {
    initSocket,
    getIo,
};
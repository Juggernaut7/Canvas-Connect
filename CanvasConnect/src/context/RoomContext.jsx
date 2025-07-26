// client/src/context/RoomContext.jsx
// Manages room-specific state and provides Socket.IO instance to children.

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';
import { useAuth } from './AuthContext'; // To get the current user's username

// Create the Room Context
const RoomContext = createContext(null);

// Room Provider Component
export const RoomProvider = ({ children }) => {
    const { currentUser, isAuthenticated } = useAuth(); // Get current user from AuthContext
    const [socket, setSocket] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [drawingHistory, setDrawingHistory] = useState([]);
    const [usersInRoom, setUsersInRoom] = useState([]); // Track users in the room
    const [isConnected, setIsConnected] = useState(false); // Socket connection status

    // Initialize socket connection when component mounts or user/room changes
    useEffect(() => {
        if (!isAuthenticated || !currentUser) {
            // Don't connect socket if not authenticated or no user
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            return;
        }

        // Connect to Socket.IO server
        const newSocket = io(SOCKET_URL, {
            autoConnect: false, // Prevent auto-connection
            query: { username: currentUser.username } // Pass username with connection
        });

        setSocket(newSocket);

        // Socket event listeners
        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected:', newSocket.id);
            setIsConnected(false);
            setRoomId(null); // Clear room ID on disconnect
            setDrawingHistory([]);
            setUsersInRoom([]);
        });

        // Clean up on unmount
        return () => {
            newSocket.disconnect();
        };
    }, [isAuthenticated, currentUser]); // Re-run if auth status or user changes

    // Join room logic
    const joinRoom = useCallback(async (id) => {
        if (!socket || !isConnected) {
            console.warn('Socket not connected yet. Cannot join room.');
            // Attempt to connect if not already
            socket?.connect();
            // This might cause a race condition, better to ensure socket is connected first.
            // For now, we'll rely on the `useEffect` above to connect.
            // A more robust solution might use a loading state for socket.
        }

        if (socket && currentUser) {
            // Ensure socket is connected before emitting joinRoom
            if (!socket.connected) {
                socket.connect();
                await new Promise(resolve => socket.on('connect', resolve)); // Wait for connection
            }

            setRoomId(id);
            socket.emit('joinRoom', { roomId: id, username: currentUser.username });

            // Listen for drawing history for this room
            socket.on('loadDrawing', (history) => {
                console.log('Loading drawing history:', history.length, 'strokes');
                setDrawingHistory(history.map(item => item.data)); // Store just the data part
            });

            // Listen for new drawing strokes from other users
            socket.on('drawing', (strokeData) => {
                setDrawingHistory(prevHistory => [...prevHistory, strokeData]);
            });

            // Listen for user join/leave events (optional for UI, but good for debugging)
            socket.on('userJoined', ({ username: joinedUsername }) => {
                console.log(`${joinedUsername} joined the room.`);
                setUsersInRoom(prev => [...prev, joinedUsername]);
            });
            // You might also want a 'userLeft' event

        } else {
            console.error("Cannot join room: Socket not initialized or user not authenticated.");
        }
    }, [socket, isConnected, currentUser]);

    // Leave room logic
    const leaveRoom = useCallback(() => {
        if (socket && roomId) {
            socket.emit('leaveRoom', { roomId, username: currentUser.username }); // Emit leave event
            socket.off('loadDrawing'); // Remove specific listeners for this room
            socket.off('drawing');
            socket.off('userJoined');
            setRoomId(null);
            setDrawingHistory([]);
            setUsersInRoom([]);
            // Do not disconnect the socket entirely, just leave the room
            // The socket can be reused to join another room.
        }
    }, [socket, roomId, currentUser]);

    // Function to emit a drawing stroke
    const emitDrawing = useCallback((strokeData) => {
        if (socket && roomId) {
            socket.emit('drawing', { roomId, strokeData });
        }
    }, [socket, roomId]);

    const roomContextValue = {
        socket,
        roomId,
        drawingHistory,
        usersInRoom,
        isConnected,
        joinRoom,
        leaveRoom,
        emitDrawing,
    };

    return (
        <RoomContext.Provider value={roomContextValue}>
            {children}
        </RoomContext.Provider>
    );
};

// Custom hook to use the Room Context
export const useRoom = () => {
    const context = useContext(RoomContext);
    if (!context) {
        throw new Error('useRoom must be used within a RoomProvider');
    }
    return context;
};

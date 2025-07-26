// client/src/services/api.js
// Handles HTTP requests to your backend API.

import { API_BASE_URL } from '../utils/constants';

// Function to create a new whiteboard room
export const createRoom = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create room');
        }
        const data = await response.json();
        return data; // Returns { roomId: '...' }
    } catch (error) {
        console.error('API Error creating room:', error);
        throw error;
    }
};

// Function to get drawing history for a specific room
export const getRoomHistory = async (roomId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch room history');
        }
        const data = await response.json();
        return data; // Returns an array of drawing strokes
    } catch (error) {
        console.error(`API Error fetching room history for ${roomId}:`, error);
        throw error;
    }
};

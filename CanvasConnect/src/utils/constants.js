// client/src/utils/constants.js
// Centralized constants for the frontend application.

// Backend API Base URL
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Whiteboard Drawing Tool Defaults
export const DEFAULT_BRUSH_COLOR = '#3498DB'; // Matches accent.DEFAULT
export const DEFAULT_BRUSH_SIZE = 5; // Default stroke width in pixels

// Drawing Tool Options 
export const BRUSH_COLORS = [
    '#3498DB', // Accent Blue
    '#2ECC71', // Emerald Green
    '#E74C3C', // Alizarin Red
    '#F1C40F', // Sunflower Yellow
    '#9B59B6', // Amethyst Purple
    '#1ABC9C', // Turquoise
    '#E67E22', // Secondary Orange
    '#ECF0F1', // Clouds (light gray)
    '#2C3E50', // Primary Dark (dark blue)
    '#000000', // Black
];

export const BRUSH_SIZES = [2, 5, 10, 15, 20]; // Available brush sizes

// Local Storage Keys
export const LS_AUTH_USERS = 'canvasConnectUsers'; // Stores registered users
export const LS_CURRENT_USER = 'canvasConnectCurrentUser'; // Stores current logged-in user

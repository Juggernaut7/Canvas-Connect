// client/src/pages/HomePage.jsx
// Landing/room selection page after successful authentication.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoom } from '../context/RoomContext';
import { createRoom } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { IoLogOutOutline } from 'react-icons/io5'; // Logout icon

const HomePage = () => {
    const [roomIdInput, setRoomIdInput] = useState('');
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const { joinRoom } = useRoom();
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        setError('');
        try {
            const response = await createRoom();
            const newRoomId = response.roomId;
            await joinRoom(newRoomId); // Join the newly created room
            navigate(`/whiteboard/${newRoomId}`); // Navigate to whiteboard
        } catch (err) {
            setError(err.message || 'Failed to create room.');
        }
    };

    const handleJoinRoom = async () => {
        setError('');
        if (!roomIdInput.trim()) {
            setError('Please enter a room ID.');
            return;
        }
        try {
            await joinRoom(roomIdInput.trim()); // Join the specified room
            navigate(`/whiteboard/${roomIdInput.trim()}`); // Navigate to whiteboard
        } catch (err) {
            setError(err.message || 'Failed to join room. Make sure the ID is correct.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-primary-dark p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.button
                onClick={handleLogout}
                className="absolute top-6 right-6 text-neutral-300 hover:text-accent-DEFAULT transition-colors duration-200 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <IoLogOutOutline size={24} /> <span className="hidden sm:inline">Logout</span>
            </motion.button>

            <motion.h1
                className="text-5xl md:text-6xl font-extrabold text-accent-DEFAULT mb-8 font-montserrat"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
            >
                Welcome, {currentUser?.username || 'Guest'}!
            </motion.h1>

            <motion.div
                className="bg-primary-light p-8 rounded-xl shadow-2xl border border-secondary-DEFAULT max-w-lg w-full space-y-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.4 }}
            >
                <h3 className="text-3xl font-bold text-neutral-50 mb-4 font-montserrat">Join or Create a Whiteboard</h3>

                <Button onClick={handleCreateRoom} className="w-full" variant="primary">
                    Create New Whiteboard
                </Button>

                <div className="flex items-center gap-4 text-neutral-400">
                    <hr className="flex-grow border-neutral-700" />
                    <span>OR</span>
                    <hr className="flex-grow border-neutral-700" />
                </div>

                <div className="space-y-4">
                    <Input
                        type="text"
                        value={roomIdInput}
                        onChange={(e) => setRoomIdInput(e.target.value)}
                        placeholder="Enter Room ID to join"
                        className="text-center"
                    />
                    <Button onClick={handleJoinRoom} className="w-full" variant="secondary">
                        Join Existing Whiteboard
                    </Button>
                </div>

                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </motion.div>
        </motion.div>
    );
};

export default HomePage;
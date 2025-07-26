// client/src/pages/LandingPage.jsx
// The main landing page demonstrating the app's purpose.

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button'; // Reusing our Button component
import { FaPaintBrush, FaUsers, FaShareAlt } from 'react-icons/fa'; // Icons for features

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-primary-dark text-neutral-50 p-6 text-center relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Hero Section */}
            <motion.h1
                className="text-5xl md:text-7xl font-extrabold text-accent-DEFAULT mb-4 font-montserrat leading-tight drop-shadow-lg"
                variants={itemVariants}
            >
                CanvasConnect
            </motion.h1>
            <motion.p
                className="text-xl md:text-2xl text-neutral-300 mb-10 max-w-2xl"
                variants={itemVariants}
            >
                Your real-time collaborative whiteboard. Draw, ideate, and share instantly with anyone, anywhere.
            </motion.p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl w-full">
                <motion.div className="bg-primary-light p-6 rounded-xl shadow-lg border border-accent-DEFAULT flex flex-col items-center" variants={itemVariants}>
                    <FaPaintBrush size={40} className="text-accent-DEFAULT mb-4" />
                    <h3 className="text-xl font-bold text-neutral-50 mb-2 font-montserrat">Intuitive Drawing</h3>
                    <p className="text-neutral-300 text-sm">Express your ideas with a versatile set of drawing tools and colors.</p>
                </motion.div>
                <motion.div className="bg-primary-light p-6 rounded-xl shadow-lg border border-secondary-DEFAULT flex flex-col items-center" variants={itemVariants}>
                    <FaUsers size={40} className="text-secondary-DEFAULT mb-4" />
                    <h3 className="text-xl font-bold text-neutral-50 mb-2 font-montserrat">Real-time Collaboration</h3>
                    <p className="text-neutral-300 text-sm">See changes instantly as others draw on the same canvas.</p>
                </motion.div>
                <motion.div className="bg-primary-light p-6 rounded-xl shadow-lg border border-accent-DEFAULT flex flex-col items-center" variants={itemVariants}>
                    <FaShareAlt size={40} className="text-accent-DEFAULT mb-4" />
                    <h3 className="text-xl font-bold text-neutral-50 mb-2 font-montserrat">Share & Persist</h3>
                    <p className="text-neutral-300 text-sm">Share unique room IDs and revisit your creations anytime.</p>
                </motion.div>
            </div>

            {/* Call to Action Buttons */}
            <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
            >
                <Link to="/login">
                    <Button variant="primary">Log In</Button>
                </Link>
                <Link to="/register">
                    <Button variant="neutral">Register</Button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default LandingPage;
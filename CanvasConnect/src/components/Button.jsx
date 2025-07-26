// client/src/components/Button.jsx
// Reusable button component with Framer Motion animations.

import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
    // Define base styles and variant-specific styles
    const baseStyles = 'px-6 py-3 rounded-lg font-bold text-lg transition-colors duration-200 ease-in-out shadow-md';
    let variantStyles = '';

    switch (variant) {
        case 'primary':
            variantStyles = 'bg-accent-DEFAULT text-neutral-900 hover:bg-accent-dark';
            break;
        case 'secondary':
            variantStyles = 'bg-secondary-DEFAULT text-neutral-900 hover:bg-secondary-dark';
            break;
        case 'neutral':
            variantStyles = 'bg-neutral-600 text-neutral-50 hover:bg-neutral-700';
            break;
        case 'outline':
            variantStyles = 'bg-transparent border-2 border-accent-DEFAULT text-accent-DEFAULT hover:bg-accent-DEFAULT hover:text-neutral-900';
            break;
        default:
            variantStyles = 'bg-accent-DEFAULT text-neutral-900 hover:bg-accent-dark';
    }

    return (
        <motion.button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles} ${className}`}
            // Framer Motion animations
            whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;

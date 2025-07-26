// client/src/components/Input.jsx
// Reusable input field component.

import React from 'react';
import { motion } from 'framer-motion';

const Input = ({ label, type = 'text', value, onChange, placeholder, className = '', ...props }) => {
    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        >
            {label && (
                <label htmlFor={props.id || label} className="block text-neutral-300 text-sm font-bold mb-2">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    w-full px-4 py-3 rounded-lg bg-neutral-800 text-neutral-50 border border-neutral-700
                    focus:outline-none focus:ring-2 focus:ring-accent-DEFAULT focus:border-transparent
                    transition-all duration-200 ease-in-out placeholder-neutral-500
                    ${className}
                `}
                {...props}
            />
        </motion.div>
    );
};

export default Input;

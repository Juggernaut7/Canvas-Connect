// client/src/components/WhiteboardToolbar.jsx
// Whiteboard drawing tools toolbar.

import React from 'react';
import { motion } from 'framer-motion';
import { BRUSH_COLORS, BRUSH_SIZES } from '../utils/constants';
import { FaPaintBrush, FaPalette, FaUndo, FaTrash } from 'react-icons/fa';

// className prop will now be passed from WhiteboardPage to style the container
const WhiteboardToolbar = ({
    brushColor,
    setBrushColor,
    brushSize,
    setBrushSize,
    onClearCanvas,
    onUndo,
    className // NEW: Accept className prop
}) => {
    return (
        <motion.div
            // Use the className prop passed from parent for overall sidebar styling
            className={className}
            initial={{ x: -100, opacity: 0 }} // Animate from left for sidebar
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
            {/* Color Picker - now a vertical flex container */}
            <div className="flex flex-col gap-2 items-center mb-4"> {/* Changed to flex-col */}
                <FaPalette className="text-neutral-300 mb-2" size={24} /> {/* Larger icon, more margin */}
                {BRUSH_COLORS.map(color => (
                    <motion.button
                        key={color}
                        onClick={() => setBrushColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${brushColor === color ? 'border-accent-DEFAULT scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Set brush color to ${color}`}
                    />
                ))}
            </div>

            {/* Size Picker - now a vertical flex container */}
            <div className="flex flex-col gap-2 items-center mb-4"> {/* Changed to flex-col */}
                <FaPaintBrush className="text-neutral-300 mb-2" size={24} /> {/* Larger icon, more margin */}
                {BRUSH_SIZES.map(size => (
                    <motion.button
                        key={size}
                        onClick={() => setBrushSize(size)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                                    ${brushSize === size ? 'bg-accent-DEFAULT text-neutral-900' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Set brush size to ${size}`}
                    >
                        {size}
                    </motion.button>
                ))}
            </div>

            {/* Undo Button */}
            <motion.button
                onClick={onUndo}
                className="p-2 rounded-lg bg-neutral-700 text-neutral-300 hover:bg-neutral-600 transition-colors duration-200 flex items-center justify-center gap-1 w-full" // Added w-full
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Undo last stroke"
            >
                <FaUndo size={18} /> <span className="hidden sm:inline">Undo</span>
            </motion.button>

            {/* Clear Canvas Button */}
            <motion.button
                onClick={onClearCanvas}
                className="p-2 rounded-lg bg-neutral-700 text-neutral-300 hover:bg-red-600 hover:text-white transition-colors duration-200 flex items-center justify-center gap-1 w-full" // Added w-full
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Clear canvas"
            >
                <FaTrash size={18} /> <span className="hidden sm:inline">Clear</span>
            </motion.button>
        </motion.div>
    );
};

export default WhiteboardToolbar;
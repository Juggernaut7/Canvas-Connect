// client/src/components/Modal.jsx
// Generic modal component with Framer Motion for entry/exit animations.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5'; // Using react-icons for close button

const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className={`bg-primary-light border border-accent-DEFAULT rounded-xl shadow-2xl p-8 text-center max-w-md w-full relative ${className}`}
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-accent-DEFAULT transition-colors duration-200"
                            aria-label="Close modal"
                        >
                            <IoClose size={24} />
                        </button>

                        {/* Modal Title */}
                        {title && (
                            <h2 className="text-3xl font-bold text-accent-DEFAULT mb-6 font-montserrat">
                                {title}
                            </h2>
                        )}

                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
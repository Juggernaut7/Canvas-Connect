// client/src/components/ChatBox.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoSend } from 'react-icons/io5';

const ChatBox = ({ messages, onSendMessage, currentUser }) => {
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (messageInput.trim()) {
            onSendMessage(messageInput.trim());
            setMessageInput('');
        }
    };

    return (
        <motion.div
            className="flex flex-col bg-primary-light p-4 rounded-xl shadow-lg border border-neutral-700 h-full max-h-[calc(100vh-200px)]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
        >
            <h3 className="text-xl font-bold text-accent-DEFAULT mb-3 font-montserrat border-b border-neutral-700 pb-2">Room Chat</h3>
            <div className="flex-grow overflow-y-auto pr-2 mb-3 custom-scrollbar">
                {messages.length === 0 ? (
                    <p className="text-neutral-500 text-sm italic">No messages yet. Say hello!</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className="mb-3 text-sm text-left text-white">
                            <span className="block">
                                <span className="font-bold">{msg.username}:</span> {msg.message}
                            </span>
                            <span className="text-xs text-neutral-400 block mt-0.5">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="flex gap-2 mt-auto">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow px-3 py-2 rounded-lg bg-neutral-800 text-neutral-50 border border-neutral-700 focus:outline-none focus:ring-1 focus:ring-accent-DEFAULT"
                />
                <motion.button
                    type="submit"
                    className="bg-accent-DEFAULT text-neutral-900 p-2 rounded-lg hover:bg-accent-dark transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Send message"
                >
                    <IoSend size={20} />
                </motion.button>
            </form>
        </motion.div>
    );
};

export default ChatBox;

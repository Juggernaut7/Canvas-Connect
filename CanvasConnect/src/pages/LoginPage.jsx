// client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            await login(username, password);
            navigate('/home'); // Navigate to home page on successful login
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-primary-dark p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-primary-light p-8 rounded-xl shadow-2xl border border-accent-DEFAULT max-w-sm w-full text-center"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            >
                <h2 className="text-4xl font-bold text-accent-DEFAULT mb-6 font-montserrat">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full">Log In</Button>
                </form>
                <p className="mt-6 text-neutral-300">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-accent-DEFAULT hover:underline font-semibold">
                        Register here
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default LoginPage;
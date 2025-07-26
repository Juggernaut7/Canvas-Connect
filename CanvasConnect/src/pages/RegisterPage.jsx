// client/src/pages/RegisterPage.jsx
// Page for new user registration.

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setSuccess(''); // Clear previous success messages

        if (username.length < 3 || password.length < 3) {
            setError('Username and password must be at least 3 characters long.');
            return;
        }

        try {
            await register(username, password);
            setSuccess('Registration successful! Redirecting to home...');
            setTimeout(() => navigate('/home'), 1500); // Redirect after a short delay
        } catch (err) {
            setError(err.message || 'Registration failed.');
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
                <h2 className="text-4xl font-bold text-accent-DEFAULT mb-6 font-montserrat">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a password"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}
                    <Button type="submit" className="w-full">Register</Button>
                </form>
                <p className="mt-6 text-neutral-300">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent-DEFAULT hover:underline font-semibold">
                        Log In here
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default RegisterPage;
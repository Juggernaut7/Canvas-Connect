// client/src/App.jsx
// Main React app, handles routing and context providers.

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider, useAuth } from './context/AuthContext';
import { RoomProvider } from './context/RoomContext';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import WhiteboardPage from './pages/WhiteboardPage.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-neutral-300">Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect authenticated users from login/register/root to home
    useEffect(() => {
        if (isAuthenticated) {
            if (window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/register') {
                navigate('/home', { replace: true });
            }
        }
    }, [isAuthenticated, navigate]);

    return (
        <AnimatePresence mode="wait">
            <div className="relative min-h-screen overflow-y-auto"> {/* Added overflow-y-auto for scrolling */}
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/whiteboard/:roomId" element={<PrivateRoute><WhiteboardPage /></PrivateRoute>} />
                    <Route path="*" element={<h1 className="text-4xl text-neutral-400 text-center mt-20">404 - Page Not Found</h1>} />
                </Routes>
            </div>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <RoomProvider>
                    <AnimatedBackground />
                    <AppContent />
                </RoomProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
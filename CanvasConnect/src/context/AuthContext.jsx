// client/src/context/AuthContext.jsx
// Manages simulated authentication state using localStorage.

import React, { createContext, useState, useEffect, useContext, useCallback, use } from 'react';
import { LS_AUTH_USERS, LS_CURRENT_USER } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

// Create the Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    // State to hold the current logged-in user
    const [currentUser, setCurrentUser] = useState(null);
    // State to indicate if the auth state has been loaded from localStorage
    const [loading, setLoading] = useState(true);

    // Effect to load current user from localStorage on initial render
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem(LS_CURRENT_USER);
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to load user from localStorage:", error);
            localStorage.removeItem(LS_CURRENT_USER); // Clear corrupted data
        } finally {
            setLoading(false); // Auth state loaded
        }
    }, []);

    // Function to get all registered users from localStorage
    const getRegisteredUsers = useCallback(() => {
        try {
            const users = localStorage.getItem(LS_AUTH_USERS);
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error("Failed to load registered users from localStorage:", error);
            return [];
        }
    }, []);

    // Function to save all registered users to localStorage
    const saveRegisteredUsers = useCallback((users) => {
        try {
            localStorage.setItem(LS_AUTH_USERS, JSON.stringify(users));
        } catch (error) {
            console.error("Failed to save registered users to localStorage:", error);
        }
    }, []);

    // Register a new user
    const register = useCallback(async (username, password) => {
        const users = getRegisteredUsers();
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            throw new Error('Username already exists!');
        }

        const newUser = { username, password };
        const updatedUsers = [...users, newUser];
        saveRegisteredUsers(updatedUsers);

        localStorage.setItem(LS_CURRENT_USER, JSON.stringify(newUser));
        setCurrentUser(newUser);
        return newUser;
    }, [getRegisteredUsers, saveRegisteredUsers]);

    // Log in an existing user
    const login = useCallback(async (username, password) => {
        const users = getRegisteredUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            throw new Error('Invalid username or password!');
        }

        localStorage.setItem(LS_CURRENT_USER, JSON.stringify(user));
        setCurrentUser(user);
        return user;
    }, [getRegisteredUsers]);

    // Log out the current user
    const logout = useCallback(() => {
        localStorage.removeItem(LS_CURRENT_USER);
        setCurrentUser(null);
    }, []);

    // Context value provided to children
    const authContextValue = {
        currentUser,
        loading,
        isAuthenticated: !!currentUser, // Convenience flag
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children} {/* Only render children once auth state is loaded */}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

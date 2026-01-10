import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persistent login
        const storedUser = localStorage.getItem('career_app_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login logic
        const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const foundUser = storedUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('career_app_user', JSON.stringify(foundUser));
            return { success: true };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    };

    const signup = (name, email, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

        if (storedUsers.some(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = { name, email, password }; // In real app, hash password!
        storedUsers.push(newUser);
        localStorage.setItem('registered_users', JSON.stringify(storedUsers));

        // Auto login after signup
        setUser(newUser);
        localStorage.setItem('career_app_user', JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('career_app_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

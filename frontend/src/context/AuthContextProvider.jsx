import { useState } from 'react';
import AuthContext from './AuthContext.js';

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('userProfile');

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);

        } catch (error) {
            console.error('Could not parse localStorage userProfile data, userProfile is removed:', error);
            localStorage.removeItem('userProfile');

            return null;
        }
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('userProfile', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userProfile');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

import { useState, useEffect } from 'react';
import { api } from '../services/api';
import AuthContext from './AuthContext.js';

export default function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    function logout() {
        setUser(null);
        setIsAuthenticated(false);
    }

    function login(userData) {
        setUser(userData);
        setIsAuthenticated(true);
    }

    useEffect(() => {
        async function checkSession() {
            try {
                const data = await api('/users/me');

                login(data.user);

            } catch {                
                logout();
                
            } finally {
                setIsLoading(false);
            }
        }

        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
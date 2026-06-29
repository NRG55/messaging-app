import { useEffect, useState } from 'react';
import AuthContext from './AuthContext.js';
import { getMe, onSessionExpired } from '../api/index.js';

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('userProfile', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userProfile');
    };

    const updateUser = (userData) => {
        setUser((prevUserData) => {
            const updatedProfile = {
                ...prevUserData,
                ...userData,
            };            
            
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            
            return updatedProfile;
        });
    };

    useEffect(() => {
        onSessionExpired(logout);
    }, []);

    useEffect(() => {
        const verifySession = async () => {
            const userProfile = localStorage.getItem('userProfile');
            
            if (!userProfile) {
                logout();
                setLoading(false);
                return;
            }

            try {
                const me = await getMe();

                login(me);

            } catch {
                logout();

            } finally {
                setLoading(false); 
            }
        };

        verifySession();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

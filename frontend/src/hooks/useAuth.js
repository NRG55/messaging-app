import { useContext } from 'react';
import AuthContext from '../context/AuthContext.js';

export default function useAuth() {
    const context = useContext(AuthContext); // returns null if useAuth hook is executed outside <AuthContextProvider />

    if (!context) {
        throw new Error('useAuth must be executed inside an <AuthContextProvider /> component.');
    }
    
    return context;
}
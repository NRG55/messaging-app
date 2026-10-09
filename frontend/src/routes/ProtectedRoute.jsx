import { Navigate, Outlet } from 'react-router';
import { useCurrentUser } from '../features/user/hooks.js';

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useCurrentUser();

    if (isLoading) {
        return <h1>Loader</h1>;
    }
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
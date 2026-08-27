import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../features/auth/hooks';

export default function PublicRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <h1>Loader</h1>;
    }
   
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
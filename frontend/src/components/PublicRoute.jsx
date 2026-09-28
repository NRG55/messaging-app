import { Navigate, Outlet } from 'react-router';
import { useCurrentUser } from '../features/user/hooks';

export default function PublicRoute() {
    const { isAuthenticated, isLoading } = useCurrentUser();

    if (isLoading) {
        return <h1>Loader</h1>;
    }
   
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
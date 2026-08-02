import { createBrowserRouter, RouterProvider } from 'react-router';
import useAuth from './hooks/useAuth';
import routes from './routes';

export default function App() {
    const { isAuthenticated, isLoading } = useAuth();
   
    if (isLoading) {
        //TODO: loader
        return <h1>Loader</h1>;
    }
    
    const router = createBrowserRouter(routes(isAuthenticated));

    return <RouterProvider router={router} />;
}
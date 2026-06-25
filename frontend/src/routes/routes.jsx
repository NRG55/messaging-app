import { Navigate } from 'react-router';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../layout/Layout';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Profile from '../components/Profile';

const routes = [
    {
        path: '/',
        errorElement: <NotFound />,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="messages" replace />,
                    },
                    {
                        path: 'messages',
                        element: <h1>Messages</h1>,
                    },                    
                    {
                        path: 'friends',
                        element: <h1>Friends</h1>,
                    },
                    {
                        path: 'groups',
                        element: <h1>Groups</h1>,
                    },
                    {
                        path: 'profile/:id?',
                        element: <Profile />,
                    },
                ],
            },
        ],
    },    
];

export default routes;

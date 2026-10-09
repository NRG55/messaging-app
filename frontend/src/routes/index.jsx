import { Navigate } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import HomeView from '../features/chat/components/HomeView';
import MobileUsersView from '../features/user/components/MobileUsersView';
import ActiveChatView from '../features/chat/components/ActiveChatView';
import SettingsRoute from './SettingsRoute';

const routes = [
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    { index: true, element: <HomeView /> },
                    { path: 'users', element: <MobileUsersView /> },
                    { path: 'settings', element: <SettingsRoute /> },
                    { path: 'chat/:chatId', element: <ActiveChatView /> },
                    
                ],
            },
        ],
    },
    {
        path: '/auth',
        element: <PublicRoute />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: 'login', element: <Login /> },
                    { path: 'register', element: <Register /> },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },    
];

export default routes;

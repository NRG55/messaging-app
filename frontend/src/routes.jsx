import { Navigate } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ActiveChatView from './features/chat/components/ActiveChatView';
import MobileSettingsView from './features/user/components/MobileSettingsView';

const routes = [
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    { index: true, element: <h1>Home view</h1> },
                    { path: 'chat/:chatId', element: <ActiveChatView /> },
                    { path: 'settings', element: <MobileSettingsView /> },
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

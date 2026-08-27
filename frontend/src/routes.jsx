import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProfileModal from './components/views/ProfileModal';
import ActiveChatView from './features/chat/components/chat/ActiveChatView';
import PublicChatView from './components/views/PrivateChat';
import { Navigate } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

const routes = [
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    { index: true, element: <PublicChatView /> },
                    { path: 'chat/:chatId', element: <ActiveChatView /> },
                    { path: 'settings', element: <h1>Settings</h1> },
                    { path: 'user/:username', element: <ProfileModal /> },
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

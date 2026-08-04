import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProfileModal from './components/views/ProfileModal';
import ActiveChatView from './components/views/PrivateChat';
import PublicChatView from './components/views/PublicChat';
import { Navigate } from 'react-router';

const routes = (isAuthenticated) => [
    {
        path: '/',
        element: isAuthenticated ? <MainLayout /> : <Navigate to="/auth/login" replace/>,
        children: [
            {               
                index: true, 
                element: <PublicChatView />, 
            },
            {               
                path: 'chat/:chatId', 
                element: <ActiveChatView />, 
            },
            {               
                path: 'settings',
                element: <h1>Settings modal</h1>,
            },
            {
                path: 'user/:username',
                element: <ProfileModal />,
            },            
        ],                
    },
    {               
        path: '/auth',
        element: !isAuthenticated ? <AuthLayout /> : <Navigate to="/" replace />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    },
    {              
        path: '*',
        element: <Navigate to="/" replace />,
    },    
];

export default routes;

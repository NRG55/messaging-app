import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import MyProfile from '../pages/MyProfile';
import UserProfile from '../pages/UserProfile';
import Friends from '../pages/Friends';

const routes = [
    {
        path: '/',
        errorElement: <NotFound />,
        element: <Home />,
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
                element: <Layout />, 
                children: [
                    { path: '/messages', element: <h1>Messages</h1> },                    
                    { path: '/friends', element: <Friends /> },
                    { path: '/groups', element: <h1>Groups</h1> },                  
                    { path: '/profile', element: <MyProfile /> },
                    { path: '/users/:id', element: <UserProfile /> },
                ],
            },
        ],
    },    
];

export default routes;

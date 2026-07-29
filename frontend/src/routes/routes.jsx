import Layout from '../components/layout/Layout';
import HomeView from '../components/views/home/HomeView';
import Login from '../components/views/auth/Login';
import Register from '../components/views/auth/Register';
import NotFound from '../components/views/error/NotFound';
import MyProfile from '../components/views/MyProfile';
import UserProfile from '../components/views/UserProfile';
import PrivateChat from '../components/views/PrivateChat';
import PublicChat from '../components/views/PublicChat';

const routes = [
    {
        path: '/',
        element: <Layout />, 
        errorElement: <NotFound />,
        children: [
            { 
                path: '/', 
                element: <HomeView />,
                children: [                   
                    { 
                        index: true, 
                        element: <PublicChat />, 
                    },
                    { path: 'chat/:userId', element: <PrivateChat /> },     
                    { path: 'users/:userId', element: <UserProfile /> }, 
                ],
            },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'groups', element: <h1>Groups</h1> },       
            { path: 'profile', element: <MyProfile /> },
        ],
    },    
];

export default routes;

import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Reguster';

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
];

export default routes;

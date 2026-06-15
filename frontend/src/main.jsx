import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './routes';
import AuthContextProvider from './context/AuthContextProvider.jsx';
import './index.css';

createRoot(document.getElementById('app')).render(
    <StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </StrictMode>,
);
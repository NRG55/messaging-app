import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AuthContextProvider from './context/AuthContextProvider.jsx';
import App from './app.jsx';
import './index.css';

createRoot(document.getElementById('app')).render(
    <StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </StrictMode>,
);
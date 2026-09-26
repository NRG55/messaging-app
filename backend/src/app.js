import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import { SessionService } from './features/session/session.service.js';

import authRoutes from './features/auth/auth.routes.js';
import sessionRoutes from './features/session/session.routes.js';
import userRoutes from './features/user/user.routes.js';
import chatRoutes from './features/chat/chat.routes.js';

const app = express();

app.use(cors({    
    origin: 'http://localhost:5173',
    credentials: true,   
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

SessionService.startCleanupUserActivity(); // every 30 minutes clear inactive users from memory

app.get('/', (req, res) => {
    res.send('Messaging app server is running!');
});

app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);
app.use('/users', userRoutes);
app.use('/chats', chatRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Messaging app listening on port ${PORT}`), 
);
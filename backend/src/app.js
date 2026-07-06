import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import chatRouter from './routes/chat.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors({    
    origin: 'http://localhost:5173',
    credentials: true,   
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Messaging app server is running!');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/chats', chatRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Messaging app listening on port ${PORT}`), 
);
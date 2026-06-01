import 'dotenv/config';
import express from 'express';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Messaging app server is running!')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Messaging app listening on port ${PORT}`) 
);
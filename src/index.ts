import express , { Application, Request, Response } from 'express';
import { connectDB } from './database/mongodb';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { PORT } from './config';
dotenv.config();
// can use env variables below this
console.log(process.env.PORT);
// .env -> PORT=5050

import  bookRoutes  from './routes/book.route';
import authRoutes from './routes/auth.route';

const app: Application = express();
// const PORT: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

async function startServer() {
    await connectDB();
    app.listen(
        PORT, 
        () => {
            console.log(`Server on http://localhost:${PORT}`);
        }
    );
}

startServer();
import express , { Application, Request, Response } from 'express';
import { connectDB } from './database/mongodb';
import dotenv from 'dotenv';
dotenv.config();
// can use env variables below this
console.log(process.env.PORT);
// .env -> PORT=5050

import  bookRoutes  from './routes/book.route';

const app: Application = express();
const PORT: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});
app.use('/api/books', bookRoutes); 

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
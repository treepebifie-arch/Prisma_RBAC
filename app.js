import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import rateLimiter from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';



const app = express();



// Middleware setup
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());


const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // limit each IP to 10 requests per windowMs
});

app.use(limiter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use ('/users', userRoutes);
app.use (errorHandler);


export default app;
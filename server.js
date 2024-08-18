// packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Utils
import connectDB from './config/db.js';

// Import routs
import userRout from './routes/userRoutes.js';
import reviewRout from './routes/reviewRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;

// Connect DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRout);
app.use('/api/v1/reviews', reviewRout);

app.listen(port, () => console.log(`Server running on port: ${port}`));

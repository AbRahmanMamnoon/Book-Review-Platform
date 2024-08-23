// packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import dataSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

// Utils
import connectDB from './config/db.js';

// Import routs
import userRout from './routes/userRoutes.js';
import reviewRout from './routes/reviewRoutes.js';
import bookRout from './routes/bookRoutes.js';

// Start express here
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// Connect DB
connectDB();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Use helmet middleware to set up a Content Security Policy (CSP) for added security.
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:'],

      fontSrc: ["'self'", 'https:', 'data:'],

      scriptSrc: ["'self'", 'unsafe-inline'],

      scriptSrc: ["'self'", 'https://*.cloudflare.com'],

      scriptSrcElem: ["'self'", 'https:', 'https://*.cloudflare.com'],

      styleSrc: ["'self'", 'https:', 'unsafe-inline'],

      connectSrc: ["'self'", 'data', 'https://*.cloudflare.com'],
    },
  })
);

//Limit requests from same API
const limiter = rateLimit({
  max: 20,
  windowMs: 50 * 60 * 1000,
  message: 'Too many requests, please try again later.',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(dataSanitize());

// Data sanitization against cross-site scripting
app.use(xss());

// Prevent parameters pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Configure CORS middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
  })
);

// Routes
app.use('/api/v1/users', userRout);
app.use('/api/v1/reviews', reviewRout);
app.use('/api/v1/books', bookRout);

app.listen(port, () => console.log(`Server running on port: ${port}`));

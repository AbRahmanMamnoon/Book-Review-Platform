import express from 'express';
const router = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import getAllBooks from '../controllers/bookController.js';

router.route('/').get(authenticate, getAllBooks);

export default router;

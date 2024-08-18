import express from 'express';
const router = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import createReview from '../controllers/reviewController.js';

router.route('/').post(authenticate, createReview);

export default router;

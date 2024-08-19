import express from 'express';
const router = express.Router();

import authenticate from '../middlewares/authMiddleware.js';
import {
  createReview,
  getAllReviews,
  searchReviewsByBook,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';

router.get('/search', searchReviewsByBook);
router.route('/').get(getAllReviews).post(authenticate, createReview);

router
  .route('/:reviewId')
  .patch(authenticate, updateReview)
  .delete(authenticate, deleteReview);

export default router;

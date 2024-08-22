import express from 'express';
import {
  registerUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  currentUserReviews,
  updateCurrentUserProfile,
} from '../controllers/userController.js';

import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutCurrentUser);
router.get('/user-reviews', authenticate, currentUserReviews);

router
  .route('/profile')
  .get(authenticate, getCurrentUserProfile)
  .patch(authenticate, updateCurrentUserProfile);

// ADMIN ROUTES 👇
export default router;

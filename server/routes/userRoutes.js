import express from 'express';
import {
  registerUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from '../controllers/userController.js';

import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutCurrentUser);

router.route('/').post(registerUser);
router
  .route('/profile')
  .get(authenticate, getCurrentUserProfile)
  .patch(authenticate, updateCurrentUserProfile);

// ADMIN ROUTES 👇
export default router;

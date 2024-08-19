import User from '../models/userModel.js';
import Review from '../models/reviewModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import validMongoDBId from '../utils/validateMongoDBId.js';
import generateToken from '../utils/generateToken.js';

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error('Please fill all the inputs.');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1) Check if email and password is exist!
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password!');
  }

  const existingUser = await User.findOne({ email });

  // 2) Check if user exists and password is correct
  if (
    existingUser &&
    (await existingUser.isPasswordValid(password, existingUser.password))
  ) {
    // 3) If every thing ok, send token to client
    generateToken(res, existingUser._id);
    res.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    });
  } else {
    res.status(401);
    throw new Error('Email or password is incorrect!');
  }
});

// Logout current user
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id; // AuthenticateUser middleware sets req.user
  validMongoDBId(userId);
  const user = await User.findById(userId);
  const userReviews = await Review.find({ user: userId });

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      userReviews,
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validMongoDBId(_id);

  const user = await User.findById(_id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  registerUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};

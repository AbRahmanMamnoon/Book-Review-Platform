import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Update to your backend URL
});

// User Registration
export const registerUser = async (userData) => {
  return await api.post('/users/register', userData, { withCredentials: true });
};

// User Login
export const loginUser = async (userData) => {
  return await api.post('/users/login', userData, { withCredentials: true });
};

// Get Current User Profile
export const getCurrentUserProfile = async () => {
  return await api.get('/users/profile', { withCredentials: true });
};

// Get Current User Reviews
export const getCurrentUserReviews = async () => {
  return await api.get('/users/user-reviews', { withCredentials: true });
};

// Update User Profile
export const updateCurrentUserProfile = async (updatedData) => {
  return await api.patch('/users/profile', updatedData, {
    withCredentials: true,
  });
};

// Update User Review
export const updateUserReview = async (reviewId, currentReview) => {
  return await api.patch(`/reviews/${reviewId}`, currentReview, {
    withCredentials: true,
  });
};

// Delete User Review
export const deleteUserReview = async (reviewId) => {
  console.log(reviewId);
  return await api.delete(`/reviews/${reviewId}`, {
    withCredentials: true,
  });
};

// Get All Reviews List
export const getReviewsList = async (filters, page) => {
  return await api.get('/reviews', {
    params: { ...filters, page },
    withCredentials: true,
  });
};

export const createReview = async (formData) => {
  return await api.post('/reviews', formData, { withCredentials: true });
};

export const searchReviewsList = async (searchTerm) => {
  return await api.get('/reviews/search', {
    params: { ...searchTerm },
    withCredentials: true,
  });
};
export const getBookList = async () => {
  return await api.get('/books', { withCredentials: true });
};

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, ListGroup, Modal } from 'react-bootstrap';
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getCurrentUserReviews,
  deleteUserReview,
  updateUserReview,
} from '../services/api'; // Import the API service

const UserProfile = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [reviews, setReviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentReview, setCurrentReview] = useState({ review: '', rating: 0 });

  useEffect(() => {
    // Fetch the user profile and their reviews
    const fetchProfile = async () => {
      try {
        const usersResponse = await getCurrentUserProfile(); // Fetch user profile
        const reviewsResponse = await getCurrentUserReviews(); // Fetch user Reviews
        setUser(usersResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        setServerError('Failed to load profile or reviews.');
      }
    };

    fetchProfile();
  }, []);

  const validateForm = () => {
    let errors = {};
    if (!user.username.trim()) {
      errors.username = 'Name is required';
    }

    if (!user.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Email is invalid';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setServerError('');
    } else {
      setErrors({});
      try {
        const response = await updateCurrentUserProfile(user);
        setUser(response.data);
        setSuccessMessage('Profile updated successfully');
        setServerError('');
      } catch (error) {
        setServerError('Failed to update profile.');
      }
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteUserReview(reviewId);
      setReviews(reviews.filter((review) => review._id !== reviewId));
      setSuccessMessage('Review deleted successfully');
    } catch (error) {
      setServerError('Failed to delete review.');
    }
  };

  const handleEditReview = (review) => {
    setCurrentReview(review);
    setShowModal(true);
  };

  const handleUpdateReview = async () => {
    try {
      const updatedReview = await updateUserReview(
        currentReview._id,
        currentReview
      );
      setReviews(
        reviews.map((review) =>
          review._id === updatedReview.data._id ? updatedReview.data : review
        )
      );
      setShowModal(false);
      setSuccessMessage('Review updated successfully');
    } catch (error) {
      setServerError('Failed to update review.');
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto my-4"
        style={{ maxWidth: '400px' }}
      >
        <h2 className="mb-4">User Profile</h2>
        {serverError && <Alert variant="danger">{serverError}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            isInvalid={!!errors.username}
            placeholder="Enter your name"
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            isInvalid={!!errors.email}
            placeholder="Enter your email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Update Profile
        </Button>
      </Form>

      <h3>Your Reviews</h3>
      <ListGroup>
        {reviews.map((review) => (
          <ListGroup.Item
            key={review._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{review.book.title}</strong> by{' '}
              <p>{review.book.author}</p>
              <p>{review.review}</p>
              <span>Rating: {review.rating}/5</span>
            </div>
            <div>
              <Button
                variant="warning"
                onClick={() => handleEditReview(review)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteReview(review._id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Edit Review Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formReview">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={currentReview.review}
              onChange={(e) =>
                setCurrentReview({ ...currentReview, review: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formRating" className="mt-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={5}
              value={currentReview.rating}
              onChange={(e) =>
                setCurrentReview({ ...currentReview, rating: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateReview}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfile;

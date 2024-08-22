import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Alert, Spinner } from 'react-bootstrap';
import ReviewFilter from './ReviewFilter';
import ReviewPagination from './ReviewPagination';
import { getReviewsList, searchReviewsList } from '../services/api';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = async (filters = {}, page = 1) => {
    try {
      setLoading(true);
      const response = await getReviewsList(filters, page);
      // Adjust the endpoint as needed
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      setError('Error fetching reviews');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSearch = (filters) => {
    fetchReviews(filters, 1);
  };

  const handlePageChange = (page) => {
    fetchReviews({}, page);
  };

  return (
    <div className="my-4">
      <h1>All Books Reviews</h1>
      <ReviewFilter onSearch={handleSearch} />

      {loading && <Spinner animation="border" />}

      {error && <Alert variant="danger">{error}</Alert>}

      <ListGroup>
        {reviews.map((review) => (
          <ListGroup.Item key={review._id}>
            <h5>
              <strong>{review.book ? review.book.title : review.title}</strong>{' '}
              <i>by</i> {review.book ? review.book.author : review.author}
            </h5>
            <p>
              <strong>Review:</strong> {review.review}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating} / 5
            </p>
            {review.user ? (
              <p>
                <strong>Reviewed by:</strong>
                {review.user.username}{' '}
              </p>
            ) : (
              ''
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ReviewPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ReviewList;

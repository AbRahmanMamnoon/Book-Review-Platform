import { useState, useEffect } from 'react';
import axios from 'axios';
import { getBookList, createReview } from '../services/api';

const BooksAndReviewsPage = () => {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState({});
  const [reviewText, setReviewText] = useState({});
  const [rating, setRating] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBookList();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleReviewChange = (bookId, field, value) => {
    if (field === 'text') {
      setReviewText({ ...reviewText, [bookId]: value });
    } else if (field === 'rating') {
      setRating({ ...rating, [bookId]: value });
    }
  };

  const submitReview = async (bookId) => {
    try {
      await createReview({
        bookId,
        reviewText: reviewText[bookId],
        rating: rating[bookId] || 1,
      });
      // Fetch updated reviews or handle success (e.g., reset form)
      setReviewText({ ...reviewText, [bookId]: '' });
      setRating({ ...rating, [bookId]: 1 });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Books and Reviews</h2>
      <ul className="list-group">
        {books.map((book) => (
          <li key={book._id} className="list-group-item">
            <h4>{book.title}</h4>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Description:</strong> {book.description}
            </p>
            <p>
              <strong>Published Date:</strong>{' '}
              {new Date(book.publishedDate).toDateString()}
            </p>
            <p>
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <p>
              <strong>Page Count:</strong> {book.pageCount}
            </p>
            <p>
              <strong>Language:</strong> {book.language}
            </p>

            {/* Review Form */}
            <h5 className="mt-4">Write a Review</h5>
            <textarea
              className="form-control"
              value={reviewText[book._id] || ''}
              onChange={(e) =>
                handleReviewChange(book._id, 'text', e.target.value)
              }
              placeholder="Write your review here..."
            />
            <select
              className="form-control mt-2"
              value={rating[book._id] || 1}
              onChange={(e) =>
                handleReviewChange(book._id, 'rating', Number(e.target.value))
              }
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            <button
              className="btn btn-success mt-2"
              onClick={() => submitReview(book._id)}
            >
              Submit Review
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksAndReviewsPage;

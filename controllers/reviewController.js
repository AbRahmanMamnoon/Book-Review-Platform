import Review from '../models/reviewModel.js';
import Book from '../models/bookModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Create a new review
const createReview = asyncHandler(async (req, res) => {
  try {
    const { bookId, reviewText, rating } = req.body;

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    // Check if the user has already reviewed this book
    const existingReview = await Review.findOne({
      book: bookId,
      user: req.user._id,
    });

    if (existingReview) {
      res.status(400);
      throw new Error('You have already reviewed this book');
    }

    // Create and save the review
    const review = await Review.create({
      bookTitle: book.title,
      bookAuthor: book.author,
      review: reviewText,
      rating,
      book: bookId,
      user: req.user._id,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

export default createReview;

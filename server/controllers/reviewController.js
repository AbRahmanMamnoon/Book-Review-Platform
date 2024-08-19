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

const getAllReviews = asyncHandler(async (req, res) => {
  let query = Review.find();

  // Pagination
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const productCount = await Review.countDocuments();
    if (skip >= productCount) throw new Error('This page does not exists!');
  }
  const reviews = await query;
  res.status(200).json(reviews);
});

const searchReviewsByBook = asyncHandler(async (req, res) => {
  const { titleOrKeyword } = req.query;
  try {
    const reviews = await Review.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $match: {
          $or: [
            { 'bookDetails.title': { $regex: titleOrKeyword, $options: 'i' } },
            { 'bookDetails.author': { $regex: titleOrKeyword, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          review: 1,
          rating: 1,
          bookTitle: '$bookDetails.title',
          bookAuthor: '$bookDetails.author',
        },
      },
    ]);

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    throw new Error('Error while searching reviews');
  }
});

const updateReview = asyncHandler(async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id; // AuthenticateUser middleware sets req.user
    const { reviewText, rating } = req.body;

    // Find the review and ensure the logged-in user is the author
    const review = await Review.findOne({ _id: reviewId, user: userId });

    if (!review) {
      return res.status(404).json({
        message:
          'Review not found or you do not have permission to edit this review.',
      });
    }

    // Update the review with new content
    review.review = reviewText || review.review;
    review.rating = rating || review.rating;
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Something wrong' });
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id; // AuthenticateUser middleware sets req.user

    // Find the review and ensure the logged-in user is the author
    const review = await Review.findOne({ _id: reviewId, user: userId });

    if (!review) {
      return res.status(404).json({
        message:
          'Review not found or you do not have permission to edit this review.',
      });
    }
    // Update the review with new content
    await Review.findByIdAndDelete({ _id: reviewId });
    res.status(204).json(null);
  } catch (error) {
    res.status(500).json({ message: 'Something wrong' });
  }
});

export {
  createReview,
  getAllReviews,
  searchReviewsByBook,
  updateReview,
  deleteReview,
};

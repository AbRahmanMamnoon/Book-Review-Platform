import mongoose, { Schema } from 'mongoose';
import Book from './bookModel.js';
import User from './userModel.js';

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    book: {
      type: Schema.ObjectId,
      ref: 'Book',
      required: [true, 'Review must belong to a book.'],
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Review Populating
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'book',
    select: 'title author -_id',
  });
  
  next();
});

reviewSchema.statics.clcRatingAverages = async function (bookId) {
  const stats = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: '$book',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Book.findByIdAndUpdate(bookId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Book.findByIdAndUpdate(bookId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// Post-save middleware to update ratings
reviewSchema.post('save', function () {
  // this point to current review
  this.constructor.clcRatingAverages(this.book);
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;

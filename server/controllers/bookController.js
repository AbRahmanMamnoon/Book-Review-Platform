import asyncHandler from '../middlewares/asyncHandler.js';
import Book from '../models/bookModel.js';

const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await Book.find({});

  res.status(200).json(allBooks);
});

export default getAllBooks;

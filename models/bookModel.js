import mongoose from 'mongoose';

// Declare the Book Schema
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    publishedDate: {
      type: Date,
    },
    publisher: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
    language: {
      type: String,
    },
    coverImageUrl: {
      type: String,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);
bookSchema.index({ title: 1, author: 1 }, { unique: true });

//Export the model
export default mongoose.model('Book', bookSchema);

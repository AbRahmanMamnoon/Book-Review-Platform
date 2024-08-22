import { useState, useEffect } from 'react';
import axios from 'axios';
import { getBookList } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

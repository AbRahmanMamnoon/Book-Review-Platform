import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ReviewFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ searchTerm });
  };

  return (
    <Form onSubmit={handleSearch} className="mb-4">
      <Form.Group controlId="formSearch">
        <Form.Label>Search Reviews</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search by book title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default ReviewFilter;

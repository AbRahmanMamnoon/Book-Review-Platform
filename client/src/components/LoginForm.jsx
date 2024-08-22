import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUser } from '../services/api';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setErrorMessage('');
      setSuccessMessage('');

      try {
        const response = await loginUser(formData); // Call the API
        // Handle successful login, e.g., store token, redirect, etc.
        setSuccessMessage('Login successful!');
        const token = response.data.token;
        localStorage.setItem('token', JSON.stringify(token)); // Store the token in localStorage
        navigate('/');
        window.location.reload();
      } catch (err) {
        setErrorMessage(err.response?.data?.message || 'Login failed');
      }
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="mx-auto my-4"
      style={{ maxWidth: '400px' }}
    >
      <h2 className="mb-4">Login</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          placeholder="Enter your email"
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          placeholder="Enter your password"
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;

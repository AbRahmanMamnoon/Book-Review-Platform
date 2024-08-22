import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust the path as necessary
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import './App.css';
import UserProfile from './components/UserProfile';
import ReviewList from './components/ReviewList';
import BooksAndReviewsPage from './components/BooksAndReviewsPage';

const App = () => {
  const isAuthenticated = localStorage.getItem('token');
  console.log(isAuthenticated);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<ReviewList />} />
        <Route
          path="/profile"
          element={
            isAuthenticated && isAuthenticated ? (
              <UserProfile />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/create-review"
          element={
            isAuthenticated && isAuthenticated ? (
              <BooksAndReviewsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

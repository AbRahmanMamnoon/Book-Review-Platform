# Book-Review-Platform

This is a web application where users can register, log in, view book reviews and search them by book title or author, and manage their profiles. Logged-in users can create, edit, and delete their reviews. The front-end is built with React.js and Bootstrap, and the back-end is powered by Node.js, Express.js, and MongoDB.

# Features

. User Registration and Login
. View all Book Reviews
. Create, Edit, and Delete Reviews (for logged-in users)
. User Profile Management
. Search Reviews
. Pagination and Sorting
. Responsive Design with Bootstrap
. Prerequisites
. Make sure you have the following installed on your machine:

# Prerequisites

Make sure you have the following installed on your machine:
. Node.js (v14.x or later)
. npm (v6.x or later)
. MongoDB

# Getting Started

1. Clone the Repository
   git clone https://github.com/AbRahmanMamnoon/Book-Review-Platform.git
   cd book-review-platform

2. Install Dependencies

   # Back-End

   Navigate to the server directory and install the dependencies:
   cd server
   npm install

   # Front-End

   Navigate to the client directory and install the dependencies:
   cd ../client
   npm install

3. Set Up Environment Variables

# Back-End

In the server directory, create a .env file and add the following:
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-review-platform
JWT_SECRET=your_jwt_secret_key

4. Run MongoDB
   Make sure your MongoDB server is running. If you have MongoDB installed locally, you can start it with:
   mongod

5. Start the Application

# Back-End

Navigate to the server directory and start the back-end server:
cd server
npm start
This will start the server on http://localhost:5000.

# Front-End

Navigate to the client directory and start the front-end development server:
cd ../client
npm run dev
This will start the front-end on http://localhost:5173. # vite default port

6. Access the Application
   Open your browser and navigate to http://localhost:5173. You should see the Book Review Platform running.

# Folder Structure

book-review-platform/
├── client/ # React Front-End
│ ├── public/
│ ├── src/
│ ├── .env
│ ├── package.json
├── server/ # Express Back-End
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── .env
│ ├── server.js
│ ├── package.json
└── README.md

# API Endpoints

# User

. POST /api/v1/users/register - Register a new user
. POST /api/v1/users/login - Login user and get JWT token
. GET /api/v1/users/profile - Get current user profile
. PATCH /api/v1/users/profile - Update current user profile
. GET /api/v1/users/user-reviews - Update current user profile

# Books

. GET /api/v1/books - Get list of all books

# Reviews

. GET /api/v1/reviews - Get list of all reviews
. GET /api/v1/reviews/search - Search list of all reviews by book title or author
. POST /api/v1/reviews - Create a new review (Logged-in users only)
. PATCH /api/v1/reviews/:reviewId - Edit a review (Author only)
. DELETE /api/v1/reviews/:reviewId - Delete a review (Author only)

# Deployment

For production, you can use services like Heroku, Vercel, or DigitalOcean to deploy your application. You may need to update your MONGO_URI to connect to a cloud MongoDB service like MongoDB Atlas.

# Acknowledgements

React
Bootstrap
Express.js
MongoDB
Node.js

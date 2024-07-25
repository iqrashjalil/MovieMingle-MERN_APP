MovieMingle
MovieMingle is a full-featured movie downloading application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to search for movies and TV shows, filter results, request content, and provides admins with a panel to manage the database and user requests.

Table of Contents

Features
Installation
Usage
API Endpoints
Technologies Used
Contributing
License
Features

Search Functionality: Users can find movies and TV shows by name.
Filtering: Refine searches by year, genre, and popularity.
User Requests: Request movies or shows not currently available.
Admin Panel: Manage the movie database, user requests, and add/edit/delete content (admin only).
Installation

Clone the repository:
Bash
git clone https://github.com/yourusername/MovieMingle.git
Use code with caution.

Navigate to the project directory:
Bash
cd MovieMingle
Use code with caution.

Install dependencies:

Client-side dependencies:

Bash
cd client
npm install
cd ../server
Use code with caution.

Server-side dependencies:

Bash
npm install
Use code with caution.

Set up environment variables:

Create a .env file in the server directory and add the following, replacing placeholders with your actual values:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Run the development server:

Server:

Bash
cd server
npm run dev
cd ../client
Use code with caution.

Client:

Bash
npm start
Use code with caution.

Usage

Register and Login: Create an account to unlock full features.
Search and Filter: Use the search bar and filters to find specific movies or shows.
Request Movies/Shows: If desired content isn't available, request it for addition.
Admin Panel: Admins can access the panel to manage the database and user requests.
API Endpoints

User Routes

POST /api/users/register: Register a new user
POST /api/users/login: Login a user
Movie Routes

GET /api/movies: Get all movies
GET /api/movies/:id: Get a single movie by ID
POST /api/movies (Admin only): Add a new movie
PUT /api/movies/:id (Admin only): Update a movie by ID
DELETE /api/movies/:id (Admin only): Delete a movie by ID
Request Routes

GET /api/requests (Admin only): Get all user requests
POST /api/requests: Create a new user request
DELETE /api/requests/:id (Admin only): Delete a user request by ID
Technologies Used

Frontend: React, Redux
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
File Storage: Cloudinary
Contributing

We welcome contributions! Follow these steps:

Fork the repository.
Create a new branch (e.g., git checkout -b feature-branch).
Implement your changes.
Commit your changes (e.g., git commit -m 'Add new feature').
Push to your branch (e.g., git push origin feature-branch).
Open a pull request.
License

This project is licensed under the MIT License.

Feel free to reach out if you have any questions or suggestions!

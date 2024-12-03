# Job Portal

This is a comprehensive job portal built using React, Material UI, Axios, and a backend server to manage users and job listings. It allows job seekers to explore job listings, company profiles, and more, while leveraging session management for secure user authentication.

## Features

- **Login Page**: A login form to authenticate users with stored credentials.
- **Job Listings**: A dynamic page that lists available job positions with roles, required skills, and salary information.
- **Company Showcase**: A gallery displaying companies with corresponding images, sourced from the backend.
- **Session Management**: Secure login, logout, and session management for users.
- **Routing**: Navigation between multiple pages such as Home, About, Job Listings, Contact, and Company Showcase using `react-router`.
- **Material UI Components**: Utilizes Material UI components for styling and creating a responsive design. (Optional: Can use other libraries like Bootstrap or CSS if not opting for Material UI).

## Technologies Used

- **React**: For building the front-end UI components.
- **Material UI**: A component library for React to speed up UI development (Optional).
- **Axios**: For making HTTP requests to the backend server.
- **React-Router**: For routing between different pages.
- **Node.js**: JavaScript runtime for the backend.
- **Express**: Web framework for building the server-side application.
- **MongoDB**: Database for storing user data and job listings.
- **JWT**: For secure user authentication.
- **Multer**: For handling file uploads in the backend.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later recommended).
- MongoDB instance (local or remote).

### Installation

#### Backend

1. Navigate to the backend directory:

   ```bash
   cd Assignment-9
   ```

2. Install dependencies:

   ```bash
   npm install
   cd client && npm install
   ```

3. Create a .env file in the backend directory and add your environment variables:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/job-portal
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   ```

4. Run the app:

   ```bash
   npm start
   ```


## Frontend Features

### Login & Session Management:
- **Login Page**: Users can log in and we keep the session until user log out.
- **Logout**: Allows users to end their sessions securely.

### Job Listings:
- **Job Listings Page**: Dynamically renders job listings from a `jobPosts` array in the frontend (no API call required for this assignment).
- **Job Information**: Each job includes a title, description, last updated time, and a link to apply.

### Company Showcase:
- **Company Showcase Page**: Displays a gallery of company images and names fetched from the backend.

### Routing:
- **Pages**: The following pages are available:
  - Home
  - About
  - Job Listings
  - Contact
  - Company Showcase



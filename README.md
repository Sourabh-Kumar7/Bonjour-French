# Bonjour French

This is an interactive French learning platform built using React, Material-UI, Axios, and a backend server to manage users and subscription plans. It allows users to subscribe to various learning plans, track their progress, and access language lessons. Admins can create and manage subscription plans, view user details, and monitor user activity, with secure authentication powered by JWT and Bcrypt.

## Features

- **Admin Dashboard**:Create and manage subscription plans.View and manage user details.
- **User Dashboard**: Browse and subscribe to various learning plans.Access structured French language lessons and interactive exercises.
- **Subscription Management**:Admins can define and manage different subscription tiers with pricing and content access.Users can subscribe to plans to access premium content.
- **User Authentication**: Secure login and signup registration with JWT authentication. Passwords are hashed and secured using Bcrypt.
- **Responsive Design**: Optimized for both desktop and mobile devices for seamless user experience.
- **Routing**: Utilizes React Router for seamless navigation between pages, such as the login, user dashboard, and admin panels.
- **Material-UI Components**: The application uses Material-UI for modern, responsive, and visually appealing UI components such as buttons, cards, forms, and dialogs.
- **Session Management**: To maintain user authentication state across pages.


## Project Structure & Tech Stack

- **client/** : Front-end (React, Material-UI, Axios for HTTP requests).
- **myapp/** : Back-end (Node.js, Express.js).
- **Dockerfile**: Configuration for containerizing the app (Docker).
- **docker-compose.yml**: Manages multi-container services, including MongoDB for data storage.
- **package.json**: Defines app dependencies and scripts (Node.js).
- **package-lock.json**: Contains installed npm package versions.

## Additional Tech Stack
- **MongoDB**: NoSQL database for storing user and subscription data.
- **JWT**: For secure user authentication and session management.
- **NPM/Yarn**: Dependency management for front-end and back-end.
- **Bcrypt**: For password hashing and secure authentication.
- **DigitalOcean**: Cloud platform used for deploying the web application, providing scalable infrastructure and managed services for hosting the platform.

## Installation Instructions

1. Clone the Repository :

  ```bash
git clone <repository-url>
cd Bonjour-French-master
 ```

2. Install Dependencies For Client (Front-End) :

  ```bash
cd client
npm install
 ```

3. For Back-End (MyApp): 

  ```bash
cd myapp
npm install
 ```

4. Set Up MongoDB: For local development, install MongoDB or use MongoDB Atlas for a cloud-based solution. Update your connection string in .env or config/database.js.

5. If you are running the Application with Docker: Make sure docker and docker compose are installed which will start the front-end, back-end, and MongoDB services in separate containers.

docker-compose up

6. If not using Docker:
- **for frontend to start** :

  ```bash
cd client
npm start
 ```

- **for backend to start** :

  ```bash
cd myapp
npm start
 ```

7. To Configure (Environment Variables): Create a .env file in the root directory and define the following variables:

  ```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=your_preferred_port
 ```

8.  Run the app:

   ```bash
   npm start
   ```

### How to use:

1. Once the application is running, access the User Dashboard at http://localhost:3000.
2. Admins can manage subscription plans, user accounts, and monitor activity.
3. Users can browse, subscribe to, and access various learning plans.

### User Flow:
1. Admin Login: Use the admin credentials to log in and access the admin dashboard.
2. User Login: Regular users can log in and view available subscription plans.

### API Endpoints:

1. Authentication Endpoints
POST /api/auth/login: Login with email and password.
POST /api/auth/signup: Register a new user.
GET /api/auth/logout: Logout the user.

2. User Endpoints
GET /api/users: Fetch all users (Admin only).
GET /api/users/:id: Fetch a specific user's details (Admin only).

3. Subscription Endpoints
GET /api/subscriptions: Fetch all subscription plans.
POST /api/subscriptions: Create a new subscription plan (Admin only).
GET /api/subscriptions/:id: Get details of a specific subscription.


##### Deployment Instructions

- **Deploy on DigitalOcean**

1. Create a Droplet (a virtual private server) on DigitalOcean.
2. Install Docker, Node.js, and MongoDB (or connect to a MongoDB Atlas instance) on the Droplet.
3. Clone the repository onto the server.
4. et up environment variables in .env.
4. Run the following to start the application:
  ```bash
docker-compose up
 ```


### Contributing

We welcome contributions! To contribute:

Fork the repository.
Clone your forked repository.
Create a new branch for your feature or fix.
Make your changes and commit.
Push to your fork and create a pull request.
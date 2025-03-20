# Online Learning Platform

A full-stack web application for online education, featuring course management, user authentication, and role-based access control.

## Project Structure

```
online-learning-platform/
├── online_frontend/    # React frontend application
└── online_backend/     # Node.js/Express backend application
```

## Features

- 🔐 User Authentication (Login/Signup)
- 👥 Role-based Access Control (Admin, Instructor, Student)
- 📚 Course Management
- 📝 Content Management
- 📱 Responsive Design

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Bootstrap for styling
- Axios for API calls
- JWT for authentication

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API architecture

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd online_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:
```bash
npm start
```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd online_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend application will run on http://localhost:3000

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile

### Courses
- GET `/api/courses` - Get all courses
- GET `/api/courses/:id` - Get specific course
- POST `/api/courses` - Create new course (Instructor/Admin only)
- PUT `/api/courses/:id` - Update course (Instructor/Admin only)
- DELETE `/api/courses/:id` - Delete course (Admin only)

### Users
- GET `/api/users` - Get all users (Admin only)
- PUT `/api/users/:id` - Update user (Admin only)
- DELETE `/api/users/:id` - Delete user (Admin only)

## User Roles and Permissions

### Admin
- Manage all courses
- Manage all users
- Access admin dashboard
- Full CRUD operations

### Instructor
- Create courses
- Manage own courses
- Access instructor dashboard
- View student progress

### Student
- View courses
- Enroll in courses
- Track progress
- Access learning materials

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

### Backend Tests
```bash
cd online_backend
node app.js
```

### Frontend Tests
```bash
cd online_frontend
npm test
```

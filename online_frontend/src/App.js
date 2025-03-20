import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CourseList from './components/Course/CourseList';
import CourseDetail from './components/Course/CourseDetail';
import CreateCourse from './components/Course/CreateCourse';
import AddChapter from './components/Course/AddChapter';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/courses" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:courseId/add-chapter" element={<AddChapter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
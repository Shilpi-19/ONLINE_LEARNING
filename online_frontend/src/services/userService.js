import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const getAuthHeader = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`, getAuthHeader());
  return response.data;
};

const updateProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/profile`, userData, getAuthHeader());
  return response.data;
};

const getEnrolledCourses = async () => {
  const response = await axios.get(`${API_URL}/courses`, getAuthHeader());
  return response.data;
};

export const userService = {
  getCurrentUser,
  updateProfile,
  getEnrolledCourses
};
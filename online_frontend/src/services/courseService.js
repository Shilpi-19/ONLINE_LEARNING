

import axios from 'axios';

const API_URL = '/api/courses';

const getAuthHeader = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const getAllCourses = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found - please login again');
        }

        console.log('Attempting to fetch courses with token:', token.substring(0, 10) + '...');
        
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
                // 'Content-Type': 'application/json'
            }
        });

        console.log('Course data received:', response.data);
        return response.data;
    } catch (error) {
            
        if (error.response?.status === 401) {
            localStorage.removeItem('token'); // Clear invalid token
            localStorage.removeItem('user');
            throw new Error('Session expired - please login again');
        }
        
        throw new Error(
            // error.response?.data?.error || 
            error.response?.data?.message || 
            // error.message || 
            'Failed to fetch courses'
        );
    }
};

const getCourseById = async (courseId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found - please login again');
        }

        const response = await axios.get(`${API_URL}/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw new Error('Session expired - please login again');
        }
        
        throw new Error(error.response?.data?.message || 'Failed to fetch course details');
    }
};
const createCourse = async (courseData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found - please login again');
        }

        const response = await axios.post(API_URL, courseData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw new Error('Session expired - please login again');
        }
        
        throw new Error(error.response?.data?.message || 'Failed to create course');
    }
};
const addChapter = async (chapterData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found - please login again');
        }

        const response = await axios.post(`${API_URL}/chapter`, chapterData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw new Error('Session expired - please login again');
        }
        
        throw new Error(error.response?.data?.message || 'Failed to add chapter');
    }
};
const enrollCourse = async (courseId) => {
  try {
    const response = await axios.post(`${API_URL}/${courseId}/enroll`, {}, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error enrolling in course:', error.response || error);
    throw error;
  }
};


export const courseService = {
    getAllCourses,
    getCourseById,
    enrollCourse,
    createCourse,
    addChapter
};
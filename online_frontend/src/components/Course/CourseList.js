import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isInstructorOrAdmin = user.role === 'instructor' || user.role === 'admin';

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !localStorage.getItem('token')) {
            navigate('/login');
            return;
        }
        
        setUserRole(user?.role || '');
        fetchCourses();
    }, [navigate]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError('');
            console.log('Fetching courses...');
            const data = await courseService.getAllCourses();
            console.log('Courses fetched successfully:', data);
            setCourses(data);
        } catch (err) {
            console.error('Error in fetchCourses:', err);
            if (err.message.includes('please login again')) {
                navigate('/login');
            }
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Available Courses</h2>
                {(userRole === 'admin' || userRole === 'instructor') && (
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/courses/create')}
                    >
                        Create New Course
                    </button>
                )}
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {courses.map(course => (
                        <div key={course._id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Instructor: {course.instructor?.name || 'Unknown'}
                                        </small>
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/courses/${course._id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isInstructorOrAdmin && (
                <div className="floating-action-btn">
                    <button 
                        className="btn btn-primary rounded-circle shadow-lg"
                        onClick={() => navigate('/courses/create')}
                        title="Create New Course"
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            )}

            <style jsx>{`
                .floating-action-btn {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 1000;
                }
                
                .floating-action-btn button {
                    width: 60px;
                    height: 60px;
                    font-size: 1.5rem;
                    transition: all 0.3s ease;
                }
                
                .floating-action-btn button:hover {
                    transform: rotate(90deg);
                }
            `}</style>
        </div>
    );
};

export default CourseList;
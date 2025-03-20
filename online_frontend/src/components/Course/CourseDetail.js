import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';

const CourseDetail = () => {
    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const user = JSON.parse(localStorage.getItem('user'));
    const isInstructorOrAdmin = user && (user.role === 'instructor' || user.role === 'admin');
    const isOwner = course && course.instructor && user && course.instructor._id === user._id;

    const fetchCourseDetails = async () => {
        try {
            const data = await courseService.getCourseById(id);
            console.log('Course details:', data);
            setCourse(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            if (err.message.includes('please login again')) {
                navigate('/login');
            }
        }
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading course details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger shadow-sm" role="alert">
                    <h4 className="alert-heading">Error Loading Course</h4>
                    <p>{error}</p>
                    <hr />
                    <button 
                        className="btn btn-outline-danger"
                        onClick={fetchCourseDetails}
                    >
                        <i className="fas fa-sync-alt me-2"></i>Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="container mt-5">
                <div className="alert alert-info shadow-sm">
                    <h4 className="alert-heading">Course Not Found</h4>
                    <p>The requested course could not be found.</p>
                    <hr />
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/courses')}
                    >
                        Browse All Courses
                    </button>
                </div>
            </div>
        );
    }

return (
    <div className="container mt-4 mb-5">
        <div className="card shadow-lg border-0 overflow-hidden">
            <div className="bg-gradient-primary text-white py-5 px-4">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h1 className="display-5 fw-bold mb-2">{course.title}</h1>
                            <p className="lead mb-0 opacity-90">
                                <i className="fas fa-book-reader me-2"></i>
                                Master your skills with this comprehensive course
                            </p>
                        </div>
                        {isInstructorOrAdmin && isOwner && (
                            <button 
                                className="btn btn-light btn-lg shadow-sm"
                                onClick={() => navigate(`/courses/${course._id}/add-chapter`)}
                            >
                                <i className="fas fa-plus-circle me-2"></i>
                                Add New Chapter
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="card-body p-4">
                <div className="row">
                    <div className="col-lg-8">
                        <section className="mb-5">
                            <h3 className="h4 text-gradient mb-4">Course Description</h3>
                            <div className="p-4 bg-white rounded-3 shadow-sm">
                                <p className="lead mb-0">{course.description}</p>
                            </div>
                        </section>

                        <section className="mb-5">
                            <h3 className="h4 text-gradient mb-4">Course Content</h3>
                            {course.chapters && course.chapters.length > 0 ? (
                                <div className="accordion shadow-sm" id="chaptersAccordion">
                                    {course.chapters.map((chapter, index) => (
                                        <div key={chapter._id} className="accordion-item border-0 mb-3">
                                            <h2 className="accordion-header">
                                                <button 
                                                    className="accordion-button collapsed bg-white"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#chapter${index}`}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <span className="chapter-number me-3">
                                                            {String(index + 1).padStart(2, '0')}
                                                        </span>
                                                        <strong>{chapter.title}</strong>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div 
                                                id={`chapter${index}`}
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#chaptersAccordion"
                                            >
                                                <div className="accordion-body bg-light">
                                                    <p className="mb-3">{chapter.description}</p>
                                                    {chapter.attachments && chapter.attachments.length > 0 && (
                                                        <div className="d-flex align-items-center">
                                                            <i className="fas fa-paperclip text-primary me-2"></i>
                                                            <span className="badge bg-primary">
                                                                {chapter.attachments.length} attachment(s)
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="alert alert-light text-center shadow-sm">
                                    <i className="fas fa-info-circle fa-2x mb-3 text-primary"></i>
                                    <p className="mb-0">No chapters available yet.</p>
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="col-lg-4">
                        <div className="card bg-white border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h3 className="h4 text-gradient mb-4">Course Instructor</h3>
                                <div className="d-flex align-items-center">
                                    <div className="bg-gradient-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                                         style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                                        {course.instructor?.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <h4 className="h5 mb-1">{course.instructor?.name || 'Unknown'}</h4>
                                        <p className="text-muted mb-2">
                                            <small>{course.instructor?.email}</small>
                                        </p>
                                        <button className="btn btn-sm btn-outline-primary">
                                            <i className="fas fa-envelope me-2"></i>
                                            Contact Instructor
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-white border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h3 className="h4 text-gradient mb-4">Course Details</h3>
                                <ul className="list-unstyled mb-0">
                                    <li className="d-flex align-items-center mb-3">
                                        <i className="fas fa-clock text-primary me-3"></i>
                                        <span>Duration: {course.duration || 'N/A'}</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <i className="fas fa-users text-primary me-3"></i>
                                        <span>Students Enrolled: {course.studentsEnrolled?.length || 0}</span>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <i className="fas fa-layer-group text-primary me-3"></i>
                                        <span>Level: {course.level || 'All Levels'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-footer bg-white p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <button 
                        className="btn btn-outline-primary"
                        onClick={() => navigate('/courses')}
                    >
                        <i className="fas fa-arrow-left me-2"></i>
                        Back to Courses
                    </button>
                    <button className="btn btn-primary">
                        <i className="fas fa-graduation-cap me-2"></i>
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CourseDetail;
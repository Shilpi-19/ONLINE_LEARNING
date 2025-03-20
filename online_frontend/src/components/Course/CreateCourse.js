import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';

const CreateCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const courseWithInstructor = {
                ...courseData,
                instructor: user._id
            };

            await courseService.createCourse(courseWithInstructor);
            navigate('/courses');
        } catch (err) {
            setError(err.message);
            if (err.message.includes('please login again')) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create New Course</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Course Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={courseData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Course'}
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
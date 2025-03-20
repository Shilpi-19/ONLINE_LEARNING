import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { courseService } from '../../services/courseService';

const AddChapter = () => {
    const { courseId } = useParams();
    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        courseId: courseId
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChapterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await courseService.addChapter(chapterData);
            navigate(`/courses/${courseId}`);
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
            <h2>Add New Chapter</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Chapter Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={chapterData.title}
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
                        value={chapterData.description}
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
                    {loading ? 'Adding...' : 'Add Chapter'}
                </button>
            </form>
        </div>
    );
};

export default AddChapter;
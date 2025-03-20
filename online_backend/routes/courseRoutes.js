const express = require('express');
const { createCourse, getCoursesByInstructor, addChapter } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, authorize('admin', 'instructor'), createCourse);
router.get('/:instructorId', protect, authorize('admin', 'instructor'), getCoursesByInstructor);
router.post('/chapter', protect, authorize('admin', 'instructor'), addChapter);

module.exports = router;

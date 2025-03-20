const Course = require('../models/courseModel');
const Chapter = require('../models/chapterModel');

exports.createCourse = async (req, res) => {
    try {
        const { title, description, instructor } = req.body;
        const course = new Course({ title, description, instructor });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCoursesByInstructor = async (req, res) => {
    try {
        const { instructorId } = req.params;
        const courses = await Course.find({ instructor: instructorId });
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// exports.getCoursesByInstructor = async (req, res) => {
//     try {
//         const { instructorId } = req.params;

//         // Validate instructorId
//         if (!instructorId) {
//             return res.status(400).json({ error: "Instructor ID is required." });
//         }

//         // Find courses by instructor
//         const courses = await Course.find({ instructor: instructorId })
//             .populate('instructor', 'name email') // Populate instructor details
//             .populate('chapters'); // Populate chapter details

//         res.status(200).json(courses);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.addChapter = async (req, res) => {
//     try {
//         const { title, description, courseId } = req.body;
//         const chapter = new Chapter({ title, description, course: courseId });
//         await chapter.save();

//         const course = await Course.findById(courseId);
//         course.chapters.push(chapter._id);
//         await course.save();

//         res.status(201).json(chapter);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

exports.addChapter = async (req, res) => {
    try {
        const { title, description, courseId } = req.body;

        // Validate input
        if (!courseId || !title || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Create a new chapter
        const chapter = new Chapter({ title, description, course: courseId });
        await chapter.save();

        // Add chapter to the course's chapters array
        course.chapters.push(chapter._id);
        await course.save();

        res.status(201).json({
            message: 'Chapter added successfully',
            chapter,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

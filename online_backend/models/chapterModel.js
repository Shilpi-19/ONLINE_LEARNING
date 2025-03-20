const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    attachments: [{ type: String }],
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
});

module.exports = mongoose.model('Chapter', chapterSchema);

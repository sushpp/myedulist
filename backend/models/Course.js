const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  // Add image field for course
  image: {
    filename: String,
    originalName: String,
    path: String,
    url: String
  },
  facilities: [String],
  eligibility: String,
  syllabus: [String]
}, {
  timestamps: true
=======
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
>>>>>>> c15d45fca (Initial commit)
});

module.exports = mongoose.model('Course', courseSchema);
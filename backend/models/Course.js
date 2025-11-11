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
=======
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
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
});

module.exports = mongoose.model('Course', courseSchema);
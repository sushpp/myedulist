const express = require('express');
<<<<<<< HEAD
const {
  createCourse,
  getCoursesByInstitute,
  updateCourse,
  deleteCourse,
  getInstituteCourses
} = require('../controllers/courseController');
const { auth, instituteAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', auth, instituteAuth, upload.single('image'), createCourse);
router.get('/institute', auth, instituteAuth, getCoursesByInstitute);
router.get('/institute/:instituteId', getInstituteCourses);
router.put('/:id', auth, instituteAuth, upload.single('image'), updateCourse);
router.delete('/:id', auth, instituteAuth, deleteCourse);
=======
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const Institute = require('../models/Institute');

// Create course
router.post('/', auth, async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.userId });
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const course = new Course({
      institute: institute._id,
      ...req.body
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get courses by institute
router.get('/institute/:instituteId', async (req, res) => {
  try {
    const courses = await Course.find({ institute: req.params.instituteId });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update course
router.put('/:id', auth, async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.userId });
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, institute: institute._id },
      req.body,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete course
router.delete('/:id', auth, async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.userId });
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      institute: institute._id
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
>>>>>>> c15d45fca (Initial commit)

module.exports = router;
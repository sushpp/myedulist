const express = require('express');
<<<<<<< HEAD
const { auth, instituteAuth } = require('../middleware/auth');
const Institute = require('../models/Institute');

const router = express.Router();

// Add facility
router.post('/', auth, instituteAuth, async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.id });
    
=======
const router = express.Router();
const auth = require('../middleware/auth');
const Facility = require('../models/Facility');
const Institute = require('../models/Institute');

// Create facility
router.post('/', auth, async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.userId });
>>>>>>> c15d45fca (Initial commit)
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

<<<<<<< HEAD
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Facility name is required' });
    }

    institute.facilities.push({
      name,
      description: description || ''
    });
    
    await institute.save();

    res.json({
      message: 'Facility added successfully',
      facilities: institute.facilities
    });
  } catch (error) {
    console.error('Add facility error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
=======
    const facility = new Facility({
      institute: institute._id,
      ...req.body
    });

    await facility.save();
    res.status(201).json(facility);
  } catch (error) {
    console.error('Error creating facility:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get facilities by institute
router.get('/institute/:instituteId', async (req, res) => {
  try {
    const facilities = await Facility.find({ institute: req.params.instituteId });
    res.json(facilities);
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update facility
router.put('/:id', auth, async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.userId });
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const facility = await Facility.findOneAndUpdate(
      { _id: req.params.id, institute: institute._id },
      req.body,
      { new: true }
    );

    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    res.json(facility);
  } catch (error) {
    console.error('Error updating facility:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete facility
router.delete('/:id', auth, async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.userId });
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const facility = await Facility.findOneAndDelete({
      _id: req.params.id,
      institute: institute._id
    });

    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    res.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    console.error('Error deleting facility:', error);
    res.status(500).json({ message: 'Server error' });
>>>>>>> c15d45fca (Initial commit)
  }
});

module.exports = router;
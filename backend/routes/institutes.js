const express = require('express');
<<<<<<< HEAD
const { 
  getInstituteById, 
  updateInstitute, 
  addFacility, 
  removeFacility,
  getAllInstitutes 
} = require('../controllers/instituteController');
const { auth, instituteAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/public', getAllInstitutes);

// Protected routes
router.get('/profile', auth, instituteAuth, getInstituteById);
router.put('/profile', auth, instituteAuth, updateInstitute);
router.post('/facilities', auth, instituteAuth, addFacility);
router.delete('/facilities/:facilityId', auth, instituteAuth, removeFacility);
=======
const router = express.Router();
const auth = require('../middleware/auth');
const Institute = require('../models/Institute');
const User = require('../models/User');

// Get all institutes (public)
router.get('/', async (req, res) => {
  try {
    const { search, category, city, minFees, maxFees, facilities } = req.query;
    
    let query = { status: 'approved' };
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }
    if (facilities) {
      query.facilities = { $in: facilities.split(',') };
    }

    const institutes = await Institute.find(query).populate('user', 'name email');
    res.json(institutes);
  } catch (error) {
    console.error('Error fetching institutes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get institute by ID
router.get('/:id', async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id).populate('user', 'name email phone');
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    res.json(institute);
  } catch (error) {
    console.error('Error fetching institute:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pending institutes (admin only)
router.get('/admin/pending', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const institutes = await Institute.find({ status: 'pending' })
      .populate('user', 'name email phone createdAt');
    res.json(institutes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Update institute status (admin only)
router.put('/admin/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const institute = await Institute.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email');

    res.json(institute);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Update institute profile
router.put('/:id', auth, async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.userId });
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const updatedInstitute = await Institute.findByIdAndUpdate(
      institute._id,
      req.body,
      { new: true }
    );

    res.json(updatedInstitute);
  } catch (error) {
    console.error('Error updating institute:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
>>>>>>> c15d45fca (Initial commit)

module.exports = router;
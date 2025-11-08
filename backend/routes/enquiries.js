const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Enquiry = require('../models/Enquiry');
const Institute = require('../models/Institute');

// Create enquiry
router.post('/', auth, async (req, res) => {
  try {
    const enquiry = new Enquiry({
      user: req.user.userId,
      ...req.body
    });

    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's own enquiries
router.get('/my-enquiries', auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ user: req.user.userId })
      .populate('institute', 'name')
      .sort({ createdAt: -1 });
    
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get enquiries by institute
router.get('/institute/:instituteId', auth, async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.userId });
    if (!institute || institute._id.toString() !== req.params.instituteId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const enquiries = await Enquiry.find({ institute: req.params.instituteId })
      .sort({ createdAt: -1 });
    
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all enquiries (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const enquiries = await Enquiry.find()
      .populate('institute', 'name')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update enquiry status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
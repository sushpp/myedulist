const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

// Create review
router.post('/', auth, async (req, res) => {
  try {
    const review = new Review({
      user: req.user.userId,
      ...req.body
    });

    await review.save();
    
    // Populate user details for response
    await review.populate('user', 'name');
    await review.populate('institute', 'name');
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reviews by institute (public)
router.get('/institute/:instituteId', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      institute: req.params.instituteId,
      status: 'approved'
    }).populate('user', 'name').sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's own reviews
router.get('/my-reviews', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.userId })
      .populate('institute', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all reviews (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('institute', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update review status (admin only)
router.put('/admin/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name').populate('institute', 'name');

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
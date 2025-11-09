const Review = require('../models/Review');
const Institute = require('../models/Institute');

// Create review
exports.createReview = async (req, res) => {
  try {
    const { institute, rating, reviewText } = req.body;

    // Check if institute exists
    const instituteExists = await Institute.findById(institute);
    if (!instituteExists) {
      return res.status(400).json({ message: 'Institute not found' });
    }

    // Check if user already reviewed this institute
    const existingReview = await Review.findOne({
      user: req.user.id,
      institute
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this institute' });
    }

    const review = new Review({
      user: req.user.id,
      institute,
      rating,
      reviewText,
      status: 'approved' // Auto-approve for demo
    });

    await review.save();
    await review.populate('user', 'name');

    res.status(201).json({
      message: 'Review submitted successfully',
      review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get reviews for an institute
exports.getInstituteReviews = async (req, res) => {
  try {
    const { instituteId } = req.params;

    // Check if institute exists
    const institute = await Institute.findById(instituteId);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const reviews = await Review.find({ 
      institute: instituteId,
      status: 'approved'
    })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error('Get institute reviews error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's reviews
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('institute', 'name category')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('user', 'name').populate('institute', 'name');

    res.json({
      message: 'Review updated successfully',
      review: updatedReview
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review or is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
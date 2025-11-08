const Review = require('../models/Review');
const { updateInstituteRating } = require('../services/reviewService');

exports.createReview = async (req, res) => {
  try {
    const review = new Review({
      ...req.body,
      user: req.user.userId
    });
    await review.save();
    
    // Update institute rating using service
    await updateInstituteRating(review.institute);
    
    await review.populate('user', 'name');
    
    res.status(201).json({ 
      success: true,
      message: 'Review submitted successfully', 
      review 
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

exports.getInstituteReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      institute: req.params.instituteId,
      isApproved: true 
    }).populate('user', 'name').sort({ createdAt: -1 });
    
    res.json({ 
      success: true,
      data: reviews 
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .populate('institute', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true,
      data: reviews 
    });
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

exports.moderateReview = async (req, res) => {
  try {
    const { action } = req.body; // 'approve' or 'reject'
    
    let review;
    if (action === 'approve') {
      review = await Review.findByIdAndUpdate(
        req.params.id, 
        { isApproved: true },
        { new: true }
      );
    } else if (action === 'reject') {
      review = await Review.findByIdAndDelete(req.params.id);
    } else {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid action' 
      });
    }

    // Update institute rating if review was approved
    if (action === 'approve' && review) {
      await updateInstituteRating(review.institute);
    }
    
    res.json({ 
      success: true,
      message: `Review ${action === 'approve' ? 'approved' : 'rejected'} successfully` 
    });
  } catch (error) {
    console.error('Error moderating review:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};
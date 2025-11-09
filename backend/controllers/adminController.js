const User = require('../models/User');
const Institute = require('../models/Institute');
const Review = require('../models/Review');
const Enquiry = require('../models/Enquiry');
const Course = require('../models/Course');

// Get dashboard analytics
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalInstitutes = await Institute.countDocuments({ status: 'approved' });
    const pendingInstitutes = await Institute.countDocuments({ status: 'pending' });
    const totalReviews = await Review.countDocuments({ status: 'approved' });
    const totalEnquiries = await Enquiry.countDocuments();
    const totalCourses = await Course.countDocuments();

    const recentActivities = await Promise.all([
      User.find().sort({ createdAt: -1 }).limit(5),
      Institute.find({ status: 'pending' }).populate('user').limit(5),
      Review.find().populate('user').populate('institute').sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      analytics: {
        totalUsers,
        totalInstitutes,
        pendingInstitutes,
        totalReviews,
        totalEnquiries,
        totalCourses
      },
      recentActivities: {
        newUsers: recentActivities[0],
        pendingInstitutes: recentActivities[1],
        recentReviews: recentActivities[2]
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get pending institutes
exports.getPendingInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find({ status: 'pending' })
      .populate('user', 'name email phone createdAt');
    
    res.json(institutes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve/reject institute
exports.updateInstituteStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const institute = await Institute.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user');

    res.json({
      message: `Institute ${status} successfully`,
      institute
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['user', 'institute'] } })
      .select('-password');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Toggle user active status
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    ).select('-password');

    res.json({
      message: `User ${req.body.isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('institute', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update review status
exports.updateReviewStatus = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, isActive: req.body.status === 'approved' },
      { new: true }
    );

    res.json({
      message: `Review ${req.body.status} successfully`,
      review
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
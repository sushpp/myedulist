const express = require('express');
<<<<<<< HEAD
const {
  getDashboardAnalytics,
  getPendingInstitutes,
  updateInstituteStatus,
  getAllUsers,
  toggleUserStatus,
  getAllReviews,
  updateReviewStatus
} = require('../controllers/adminController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, adminAuth, getDashboardAnalytics);
router.get('/institutes/pending', auth, adminAuth, getPendingInstitutes);
router.put('/institutes/:id/status', auth, adminAuth, updateInstituteStatus);
router.get('/users', auth, adminAuth, getAllUsers);
router.put('/users/:id/status', auth, adminAuth, toggleUserStatus);
router.get('/reviews', auth, adminAuth, getAllReviews);
router.put('/reviews/:id/status', auth, adminAuth, updateReviewStatus);
=======
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Admin dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.'
      });
    }

    const pendingInstitutes = await User.countDocuments({ 
      role: 'institute', 
      status: 'pending' 
    });
    
    const totalInstitutes = await User.countDocuments({ 
      role: 'institute' 
    });
    
    const approvedInstitutes = await User.countDocuments({ 
      role: 'institute', 
      status: 'approved' 
    });

    const totalStudents = await User.countDocuments({ 
      role: 'student' 
    });

    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      data: {
        pendingInstitutes,
        totalInstitutes,
        approvedInstitutes,
        totalStudents,
        totalUsers
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
});
>>>>>>> c15d45fca (Initial commit)

module.exports = router;
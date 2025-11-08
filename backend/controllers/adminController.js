const Institute = require('../models/Institute');
const User = require('../models/User');
const Review = require('../models/Review');
const Enquiry = require('../models/Enquiry');

// Get pending institutes - FIXED VERSION
const getPendingInstitutes = async (req, res) => {
  try {
    console.log('🔍 Fetching pending institutes...');
    
    const institutes = await Institute.find({ adminApproved: false })
      .populate('userId', 'name email phone createdAt');
    
    console.log(`✅ Found ${institutes.length} pending institutes`);
    
    // Log the institutes for debugging
    institutes.forEach(inst => {
      console.log(`   - ${inst.name} | ${inst.contactEmail} | Approved: ${inst.adminApproved}`);
    });
    
    res.json(institutes);
  } catch (error) {
    console.error('❌ Get pending institutes error:', error);
    res.status(500).json({ 
      message: 'Error fetching pending institutes', 
      error: error.message 
    });
  }
};

// Approve institute - FIXED VERSION
const approveInstitute = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`✅ Approving institute: ${id}`);
    
    const institute = await Institute.findByIdAndUpdate(
      id,
      { 
        adminApproved: true, 
        verified: true 
      },
      { new: true }
    ).populate('userId', 'name email');

    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    console.log(`🎉 Institute approved: ${institute.name}`);
    
    res.json({
      message: 'Institute approved successfully',
      institute
    });
  } catch (error) {
    console.error('❌ Approve institute error:', error);
    res.status(500).json({ 
      message: 'Error approving institute', 
      error: error.message 
    });
  }
};

// Reject institute
const rejectInstitute = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`❌ Rejecting institute: ${id}`);
    
    const institute = await Institute.findByIdAndDelete(id);
    
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    // Also delete the associated user
    await User.findByIdAndDelete(institute.userId);
    
    console.log(`🗑️ Institute rejected and deleted: ${institute.name}`);
    
    res.json({
      message: 'Institute rejected and removed successfully'
    });
  } catch (error) {
    console.error('Reject institute error:', error);
    res.status(500).json({ 
      message: 'Error rejecting institute', 
      error: error.message 
    });
  }
};

// Get analytics - FIXED VERSION
const getAnalytics = async (req, res) => {
  try {
    const totalInstitutes = await Institute.countDocuments({ adminApproved: true });
    const totalUsers = await User.countDocuments({ role: 'user', isActive: true });
    const totalReviews = await Review.countDocuments({ approvalStatus: 'approved' });
    const totalEnquiries = await Enquiry.countDocuments();
    const pendingInstitutes = await Institute.countDocuments({ adminApproved: false });

    console.log(`📊 Analytics - Pending: ${pendingInstitutes}, Total: ${totalInstitutes}`);

    res.json({
      totalInstitutes,
      totalUsers,
      totalReviews,
      totalEnquiries,
      pendingInstitutes,
      recentActivities: []
    });
  } catch (error) {
    console.error('❌ Get analytics error:', error);
    res.status(500).json({ 
      message: 'Error fetching analytics', 
      error: error.message 
    });
  }
};

module.exports = {
  getPendingInstitutes,
  approveInstitute,
  rejectInstitute,
  getAnalytics
};
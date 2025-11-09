const Enquiry = require('../models/Enquiry');
const Institute = require('../models/Institute');

// Create enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const { institute, name, email, phone, message } = req.body;

    // Check if institute exists and is approved
    const instituteExists = await Institute.findById(institute);
    if (!instituteExists || instituteExists.status !== 'approved') {
      return res.status(400).json({ message: 'Institute not found or not approved' });
    }

    const enquiry = new Enquiry({
      user: req.user.id,
      institute,
      name,
      email,
      phone,
      message
    });

    await enquiry.save();

    res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry
    });
  } catch (error) {
    console.error('Create enquiry error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get enquiries for institute
exports.getInstituteEnquiries = async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.id });
    
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const enquiries = await Enquiry.find({ institute: institute._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (error) {
    console.error('Get institute enquiries error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's enquiries
exports.getUserEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ user: req.user.id })
      .populate('institute', 'name category')
      .sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (error) {
    console.error('Get user enquiries error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update enquiry status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({
      message: 'Enquiry status updated successfully',
      enquiry
    });
  } catch (error) {
    console.error('Update enquiry status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Respond to enquiry
exports.respondToEnquiry = async (req, res) => {
  try {
    const { response } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { 
        response,
        status: 'resolved'
      },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({
      message: 'Response sent successfully',
      enquiry
    });
  } catch (error) {
    console.error('Respond to enquiry error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
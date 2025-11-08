const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry({
      ...req.body,
      user: req.user.userId
    });
    await enquiry.save();
    
    await enquiry.populate('user', 'name email');
    await enquiry.populate('institute', 'name');
    
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getInstituteEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ institute: req.params.instituteId })
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.respondToEnquiry = async (req, res) => {
  try {
    const { response } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { 
        response,
        status: 'responded',
        respondedAt: new Date()
      },
      { new: true }
    ).populate('user', 'name email');
    
    res.json({ message: 'Response sent successfully', enquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
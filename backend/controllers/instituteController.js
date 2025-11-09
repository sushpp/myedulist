const Institute = require('../models/Institute');
const Course = require('../models/Course');

// Get all institutes (public route)
exports.getAllInstitutes = async (req, res) => {
  try {
    const { category, city, minFees, maxFees, facilities, rating } = req.query;
    
    let filter = { status: 'approved' };
    
    if (category) filter.category = category;
    if (city) filter['address.city'] = new RegExp(city, 'i');
    
    const institutes = await Institute.find(filter)
      .populate('user', 'name email phone')
      .lean();

    res.json(institutes);
  } catch (error) {
    console.error('Error fetching institutes:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get institute by ID
exports.getInstituteById = async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.id })
      .populate('user', 'name email phone');
    
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    res.json(institute);
  } catch (error) {
    console.error('Error fetching institute:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update institute profile
exports.updateInstitute = async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.id });
    
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const updatedInstitute = await Institute.findByIdAndUpdate(
      institute._id,
      { $set: req.body },
      { new: true }
    ).populate('user', 'name email phone');

    res.json({
      message: 'Institute updated successfully',
      institute: updatedInstitute
    });
  } catch (error) {
    console.error('Error updating institute:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add facility
// Add facility
exports.addFacility = async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.id });
    
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Facility name is required' });
    }

    const newFacility = {
      name,
      description: description || ''
    };

    institute.facilities.push(newFacility);
    await institute.save();

    res.json({
      message: 'Facility added successfully',
      facilities: institute.facilities
    });
  } catch (error) {
    console.error('Add facility error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove facility
exports.removeFacility = async (req, res) => {
  try {
    const institute = await Institute.findOne({ user: req.user.id });
    
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    const { facilityId } = req.params;
    
    institute.facilities = institute.facilities.filter(
      facility => facility._id.toString() !== facilityId
    );
    
    await institute.save();

    res.json({
      message: 'Facility removed successfully',
      facilities: institute.facilities
    });
  } catch (error) {
    console.error('Remove facility error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
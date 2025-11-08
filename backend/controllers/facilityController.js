const Facility = require('../models/Facility');

exports.getInstituteFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find({ institute: req.params.instituteId });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createFacility = async (req, res) => {
  try {
    const facility = new Facility({
      ...req.body,
      institute: req.params.instituteId
    });
    await facility.save();
    res.status(201).json({ message: 'Facility created successfully', facility });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json({ message: 'Facility updated successfully', facility });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    await Facility.findByIdAndDelete(req.params.id);
    res.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.toggleFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    facility.isAvailable = !facility.isAvailable;
    await facility.save();
    res.json({ message: 'Facility status updated', facility });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
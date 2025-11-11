const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
<<<<<<< HEAD
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['school', 'college', 'coaching', 'preschool', 'university']
=======
    required: true
  },
  category: {
    type: String,
    required: true
>>>>>>> c15d45fca (Initial commit)
  },
  affiliation: {
    type: String,
    required: true
  },
  address: {
<<<<<<< HEAD
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  contact: {
    phone: String,
    email: String,
    website: String
=======
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  website: {
    type: String
>>>>>>> c15d45fca (Initial commit)
  },
  description: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  facilities: [{
    name: String,
    description: String
  }],
  // Add image fields
  logo: {
    filename: String,
    originalName: String,
    path: String,
    url: String
  },
  images: [{
    filename: String,
    originalName: String,
    path: String,
    url: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
=======
  logo: {
    type: String,
    default: ''
  },
  banner: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  facilities: [{
    type: String
>>>>>>> c15d45fca (Initial commit)
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  verified: {
    type: Boolean,
    default: false
<<<<<<< HEAD
  }
}, {
  timestamps: true
=======
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
>>>>>>> c15d45fca (Initial commit)
});

module.exports = mongoose.model('Institute', instituteSchema);
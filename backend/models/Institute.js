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
=======
<<<<<<< HEAD
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['school', 'college', 'coaching', 'preschool', 'university']
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    required: true
  },
  category: {
    type: String,
    required: true
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  },
  affiliation: {
    type: String,
    required: true
  },
  address: {
<<<<<<< HEAD
=======
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
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  },
  description: {
    type: String,
    required: true
  },
<<<<<<< HEAD
=======
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
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
=======
<<<<<<< HEAD
  }
}, {
  timestamps: true
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
});

module.exports = mongoose.model('Institute', instituteSchema);
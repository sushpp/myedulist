const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
<<<<<<< HEAD
    required: true,
    trim: true
=======
    required: true
>>>>>>> c15d45fca (Initial commit)
  },
  email: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
=======
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
>>>>>>> c15d45fca (Initial commit)
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'institute', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
<<<<<<< HEAD
  // Add profile image field
  profileImage: {
    filename: String,
    originalName: String,
    path: String,
    url: String
  }
}, {
  timestamps: true
=======
  createdAt: {
    type: Date,
    default: Date.now
  }
>>>>>>> c15d45fca (Initial commit)
});

module.exports = mongoose.model('User', userSchema);
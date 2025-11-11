const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
<<<<<<< HEAD
    required: true
=======
<<<<<<< HEAD
    required: true,
    trim: true
=======
    required: true
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  },
  email: {
    type: String,
    required: true,
<<<<<<< HEAD
=======
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
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
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
=======
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
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
  createdAt: {
    type: Date,
    default: Date.now
  }
<<<<<<< HEAD
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
});

module.exports = mongoose.model('User', userSchema);
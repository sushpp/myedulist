const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
<<<<<<< HEAD
=======
<<<<<<< HEAD
  isActive: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('Review', reviewSchema);
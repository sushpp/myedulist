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
  isActive: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('Review', reviewSchema);
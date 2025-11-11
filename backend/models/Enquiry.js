const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
<<<<<<< HEAD
=======
<<<<<<< HEAD
    enum: ['new', 'contacted', 'resolved'],
    default: 'new'
  },
  response: String
}, {
  timestamps: true
=======
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
    enum: ['pending', 'responded'],
    default: 'pending'
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

module.exports = mongoose.model('Enquiry', enquirySchema);
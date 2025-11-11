const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

<<<<<<< HEAD
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'edulist_secret_key_2024');
=======
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
>>>>>>> c15d45fca (Initial commit)
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

<<<<<<< HEAD
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
=======
    req.user = {
      userId: user._id,
      role: user.role
    };
    
    next();
  } catch (error) {
>>>>>>> c15d45fca (Initial commit)
    res.status(401).json({ message: 'Token is not valid' });
  }
};

<<<<<<< HEAD
const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const instituteAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'institute') {
      return res.status(403).json({ message: 'Access denied. Institute only.' });
    }
    next();
  } catch (error) {
    console.error('Institute auth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { auth, adminAuth, instituteAuth };
=======
module.exports = auth;
>>>>>>> c15d45fca (Initial commit)

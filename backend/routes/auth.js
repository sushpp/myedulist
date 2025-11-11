const express = require('express');
<<<<<<< HEAD
const { register, login, getMe } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

=======
const { register, login } = require('../controllers/auth');
>>>>>>> c15d45fca (Initial commit)
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
<<<<<<< HEAD
router.get('/me', auth, getMe);
=======
>>>>>>> c15d45fca (Initial commit)

module.exports = router;
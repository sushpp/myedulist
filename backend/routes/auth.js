const express = require('express');
<<<<<<< HEAD
const { register, login } = require('../controllers/auth');
=======
<<<<<<< HEAD
const { register, login, getMe } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

=======
const { register, login } = require('../controllers/auth');
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
<<<<<<< HEAD
=======
<<<<<<< HEAD
router.get('/me', auth, getMe);
=======
>>>>>>> c15d45fca (Initial commit)
>>>>>>> c12b9554ad867aeeab065de4f2c4fbf7a05570bc

module.exports = router;
const express = require('express');
const router = express.Router();
const { signup, login, getUserData, borrowMoney } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Route for signup
router.post('/signup', signup);

// Route for login
router.post('/login', login);

// Route for getting user data
router.get('/user', auth, getUserData);

// Route for borrowing money
router.post('/borrow', auth, borrowMoney);

module.exports = router;

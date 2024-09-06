const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    register,
    getUser,
    login,
    logout
} = require('../controllers/user');
const isAuth = require('../middlewares/auth');

// Get all users
// router.get('/all', getAllUsers);

// Register new user
router.post('/new', register);

// login
router.post('/login', login);

// Get user by ID
router.get('/user', isAuth, getUser);

// logout
router.get('/logout', logout);


module.exports = router;

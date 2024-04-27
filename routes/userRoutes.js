// routes/userRoutes.js

const express = require('express');
const router = express.Router();

const {getUserdetails, registerUser, loginUser } = require('../controllers/userControllers');
const authenticateUser = require('../middleware/authMiddleware');

// Define routes for user
router.get('/getprofile',authenticateUser,getUserdetails);

router.post('/register',registerUser);

router.post('/login', loginUser);

module.exports = router;

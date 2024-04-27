// routes/userRoutes.js

const express = require('express');
const router = express.Router();

const {getUserdetails, registerUser, loginUser } = require('../controllers/userControllers');

// Define routes for user
router.get('/',getUserdetails);

router.post('/register',registerUser);

router.post('/login', loginUser);

module.exports = router;

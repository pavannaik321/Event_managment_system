const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Admin = require('../models/Admins');

const authenticateUser = async (req, res, next) => {
    try {
        // Check if the request contains a token in cookies
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Verify the token
        const token = req.cookies.token;
        const decoded = jwt.verify(token, 'matharchord');

        // Find the user in the database
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Attach the user object to the request for further use in the route handlers
        req.user = user;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};




// Authenticate Admin

const authenticateAdmin = async (req, res, next) => {
    try {
        // Check if the request contains a token in cookies
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Verify the token
        const token = req.cookies.token;
        const decoded = jwt.verify(token, 'matharchord');

        // Find the user in the database
        const admin = await Admin.findOne({ email: decoded.email });
        if (!admin) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Attach the user object to the request for further use in the route handlers
        req.admin = admin;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {authenticateUser,authenticateAdmin} ;
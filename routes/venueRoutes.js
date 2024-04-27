// routes/userRoutes.js

const express = require('express');
const router = express.Router();

// const {getUserdetails, registerUser, loginUser } = require('../controllers/userControllers');
const { authenticateUser } = require('../middleware/authMiddleware');
const Venue = require('../models/Venue');
const Admin = require('../models/Admins');


// show the list of venues
router.get('/venues', authenticateUser, async (req, res) => {
    try {
        const venues = await Venue.find({})
        res.status(200).json(venues)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
});



// show the list of venders and Admins
router.get('/venders', authenticateUser, async (req, res) => {
    try {
        const venders = await Admin.find({}).populate({
            path: 'venue',
            model: 'Venue',
            options: { strictPopulate: false }
        });
        res.status(200).json(venders)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
})


// get list or features of specific vender
router.get('/venders/:id', authenticateUser, async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        if (id) {
            const data = await Admin.findOne({ "_id": id }).populate({
                path: 'venue',
                populate: {
                    path: 'foodIDs',
                    model: 'Food',
                    options: { strictPopulate: false }
                }
            })
                .populate({
                    path: 'venue',
                    populate: {
                        path: 'photographIDs',
                        model: 'Photography',
                        options: { strictPopulate: false }
                    }
                });
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ error: 'No data found' })
            }
        }
        else {
            return res.status(400).json({ error: 'Please enter revelent input' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router;
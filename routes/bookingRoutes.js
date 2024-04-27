const express = require('express');
const bookingRoutes = express.Router();
const Booking = require('../models/Bookings')
const {authenticateUser,authenticateAdmin} = require('../middleware/authMiddleware');


// add booking form the user part
bookingRoutes.post('/book',authenticateUser, async (req, res) => {
    try {
        const { user, vendorId, food, photo, startTime, endTime } = req.body;
        const newBooking = new Booking({
            user: user,
            vendorId: vendorId,
            food: food,
            photo: photo,
            startTime: startTime,
            endTime: endTime
        });
        const savedBooking = await newBooking.save();
        res.json(savedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the booking.' });
    }
})

// user can access the booking routs
bookingRoutes.get('/userview',authenticateUser,async (req,res)=>{
    try {
        const bookings = await Booking.find({user:req.user._id})
            .populate('user', 'username email') 
            .populate('vendorId') 
            .populate('food')
            .populate('photo');
        
        res.json(bookings);
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching bookings.' });
    }
   
})

// vendor can access the booking
bookingRoutes.get('/vendorview',authenticateAdmin,async(req,res)=>{
    try {
        const bookings = await Booking.find({vendorId:req.admin._id})
            .populate('user', 'username email') 
            .populate('vendorId') 
            .populate('food')
            .populate('photo');
        
        res.json(bookings);
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching bookings.' });
    }
})

module.exports = bookingRoutes;
const express = require('express');
const bookingRoutes = express.Router();
const Booking = require('../models/Bookings')
const {authenticateUser} = require('../middleware/authMiddleware');

bookingRoutes.post('/book', async (req, res) => {
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

bookingRoutes.get('/bookings',async (req,res)=>{
    try {
        console.log(req.body)
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching bookings.' });
    }
})

module.exports = bookingRoutes;
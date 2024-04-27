const mongoose = require('mongoose');
const Booking = require('./Bookings'); // Corrected reference to Booking model

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    bookings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking' // Corrected reference to Booking model
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;

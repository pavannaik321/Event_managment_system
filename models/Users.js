const mongoose = require('mongoose');
const Booking = require('./Bookings');

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
    bookingIDs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: Booking
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

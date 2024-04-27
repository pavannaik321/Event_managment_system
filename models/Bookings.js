const mongoose = require('mongoose');
const Users = require('./Users');
const Venue = require('./Venue');
const Food = require('./Food');
const Photo = require('./Photography');
const { Schema } = mongoose;

const BookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' }, // Corrected reference to Users model
    vendorId: { type: Schema.Types.ObjectId, ref: 'Venue' },
    food: { type: Schema.Types.ObjectId, ref: 'Food' },
    photo: { type: Schema.Types.ObjectId, ref: 'Photo' }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;

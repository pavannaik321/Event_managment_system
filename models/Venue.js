const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photos: [{
    type: String 
  }],
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ownerID: {
    type: String,
    required: true
  },
}, { timestamps: true }); 

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;

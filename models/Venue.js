const mongoose = require('mongoose')
const Food = require('./Food')
const Photography = require('./Photography')

const Schema = mongoose.Schema

const venueSchema = mongoose.Schema({
  venueName: {
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
  foodIDs: [{
    type: Schema.Types.ObjectId,
    ref: Food
  }],
  photographIDs: [{
    type: Schema.Types.ObjectId,
    ref: Photography
  }]
}, { timestamps: true }); 


const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;

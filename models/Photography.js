// models/Food.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the food schema
const Photography = new Schema({
  Studioname: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Create and export the Food model
const Photo = mongoose.model('Photography', Photography);
module.exports = Photo;

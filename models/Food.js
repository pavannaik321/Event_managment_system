

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the food schema
const foodSchema = new Schema({
  cateringName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  menu: {
    type: [String],
    required: true
  },
  type: {
    type: String,
    enum: ['veg', 'non-veg'],
    required: true
  }
});

// Create and export the Food model
const Food = mongoose.model('Food', foodSchema);
module.exports = Food;

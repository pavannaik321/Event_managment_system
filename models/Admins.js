const mongoose = require('mongoose');
const venue = require('./Venue');
const adminSchema = new mongoose.Schema({
  vendorname: {
    type: String,
    required: true,
    unique: true 
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  phone: {
    type: Number,
    required: true,
  },
  venderoffice: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  venue:{
    type: mongoose.Schema.Types.ObjectId,
    ref: venue
  }
}, { timestamps: true }); 

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;



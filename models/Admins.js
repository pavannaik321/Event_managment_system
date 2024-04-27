const mongoose = require('mongoose');
const venue = require('./Venue');
const adminSchema = new mongoose.Schema({
  vendorname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  phone: {
    type: Number,
    required: true
  },
  venderoffice: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  venue: [{  //this is wrong for now
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue'
  }],
}); 

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;



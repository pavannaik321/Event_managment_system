const express = require('express');
const adminRouter = express.Router();
const Photography = require('../models/Photography')
const Food = require('../models/Food')
const Admin = require('../models/Admins')
const jwttoken = require("jsonwebtoken");
const { authenticateAdmin } = require('../middleware/authMiddleware');
const Venue = require('../models/Venue');

adminRouter.post('/addFood', authenticateAdmin, async (req, res) => {
  try {
    const { cateringName, price, menu, type } = req.body;
    const newFood = new Food({
      cateringName,
      price,
      menu,
      type
    });
    const savedFood = await newFood.save();
    console.log("saved Food : ", savedFood)
    // get the Venue collection
    const Admin_venue = req.admin.venue.toString();
    // console.log("venue Id : ", Admin_venue.toString());
    console.log(savedFood._id);
    const newVenue = await Venue.findOneAndUpdate({ '_id': Admin_venue }, {
      $push: {
        foodIDs: savedFood._id
      }
    }, { new: true })
    // modify the venue table


    res.status(201).json(newVenue);
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

adminRouter.post('/addVenue', authenticateAdmin, async (req, res) => {

  try {
    const { venueName, location, capacity, description, price } = req.body;

    const newVenue = new Venue({ venueName, location, capacity, description, price });
    const savedVenue = await newVenue.save();

    const email = req.admin.email
    console.log(savedVenue._id);
    console.log(req.admin.email)

    const updatedAdmin = await Admin.findOneAndUpdate(
      { email }
      ,
      {
        $push: {
          venue: savedVenue._id
        }
      }
    )
    res.status(201).json(updatedAdmin);
  } catch (error) {
    console.error('Error creating photography service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

adminRouter.post('/addPhotographer', authenticateAdmin, async (req, res) => {
  console.log(req.body.Studioname)
  try {
    const { Studioname, description, price } = req.body;
    const newPhotography = new Photography({
      Studioname,
      description,
      price
    });
    const savedPhotography = await newPhotography.save();

    // get the Venue collection
    const Admin_venue = req.admin.venue.toString();
    const newVenue = await Venue.findOneAndUpdate({ '_id': Admin_venue }, {
      $push: {
        photographIDs: savedPhotography._id
      }
    }, { new: true })


    res.status(201).json(newVenue);
  } catch (error) {
    console.error('Error creating photography service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


 adminRouter.post("/register", async (req, res) => {
  try {
    const { vendorname, email, phone, venderoffice, password } = req.body;
    console.log("1")
    console.log(req.body)
    // Validate the input
    if (!vendorname || !email || !password || !venderoffice || !phone) {
      return res.status(400).json({ error: 'Please enter all the fields' });
    }
    console.log("2")
    // Check if the email is already registered
    const existingVendor = await Admin.findOne({ email });
    console.log("3")
    if (existingVendor) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    console.log("4")
        // Create a new user with a dummy username
        const newAdmin = new Admin({ vendorname, email, phone, venderoffice, password, username: 'dummyUsername' } );
        console.log("5")
        await newAdmin.save();
        console.log("6")

    res.status(201).json({ message: 'vendor registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})


adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    //generate jwttoken 

    const token = jwttoken.sign({ email: user.email }, "matharchord", { expiresIn: '2h' })
    res.cookie('token', token);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


module.exports = adminRouter;
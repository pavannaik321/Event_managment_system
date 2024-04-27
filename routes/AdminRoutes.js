const express = require('express');
const adminRouter = express.Router();
const Photography=require('../models/Photography')
const Food=require('../models/Food')
const Admin=require('../models/Admins')

adminRouter.post('/addFood',async (req,res)=>{
    try {
        const { cateringName, price, menu, type } = req.body;
        const newFood = new Food({
          cateringName,
          price,
          menu,
          type
        });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
      } catch (error) {
        console.error('Error creating food:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

adminRouter.post('/addPhotographer',async (req,res)=>{
    console.log(req.body.Studioname)
    try {
        const { Studioname, description, price } = req.body;
        const newPhotography = new Photography({
          Studioname,
          description,
          price
        });
        const savedPhotography = await newPhotography.save();
        res.status(201).json(savedPhotography);
      } catch (error) {
        console.error('Error creating photography service:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

adminRouter.post("/login",async(req,res)=>{
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


module.exports = adminRouter;
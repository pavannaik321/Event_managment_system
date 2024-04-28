// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart')
const {getUserdetails, registerUser, loginUser } = require('../controllers/userControllers');
const {authenticateUser} = require('../middleware/authMiddleware');

// Define routes for user
router.get('/getprofile',authenticateUser,getUserdetails);

router.post('/register',registerUser);

router.post('/login', loginUser);

router.post('/addToCart',authenticateUser, async (req, res) => {
    try {
        const { user, vendorId, food, photo, startTime, endTime } = req.body;
        const cart = new Cart({
            user: user,
            vendorId: vendorId,
            food: food,
            photo: photo,
            startTime: startTime,
            endTime: endTime
        });
        const savedCart = await cart.save();
        res.json(savedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the booking.' });
    }
})

router.get('/userCart',authenticateUser,async (req,res)=>{
    try {
        const cart = await Cart.find({user:req.user._id})
            .populate('user', 'username email') 
            .populate('vendorId') 
            .populate('food')
            .populate('photo');
        
        res.json(cart);
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching bookings.' });
    }
   
})



module.exports = router;

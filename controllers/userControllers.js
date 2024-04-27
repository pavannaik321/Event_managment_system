const User = require('../models/Users')
const jwttoken = require("jsonwebtoken")
const Venue = require('../models/Venue')

const getUserdetails = async(req, res) => {
    res.status(500).json(req.user)
}




const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate the input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Please enter all the fields' });
        }
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body

        //Check if the email and password exist
        if(!email || !password){
            return res.status(400).json({error: 'Please enter all the fields'})
        }
        //Check if the user exists
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({error: 'User does not exist'})
        }
        //Check if the password is correct
        if(!(password==existingUser.password))
        {
            return res.status(400).json({error: 'Invalid credentials'})
        }
        //generate jwttoken 
        
        const token = jwttoken.sign({email:existingUser.email},"matharchord",{expiresIn:'2h'})
        res.cookie('token',token);
        res.status(200).json(token)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserdetails
};
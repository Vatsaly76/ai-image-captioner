const user = require('../models/user.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
    const { username, password } = req.body;

    const isuser =  await userModel.findOne({ username });
    
    if (isuser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newuser = await userModel.create({ 
        username,
        password: await bcrypt.hash(password,10) 
    });
   
    const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET)

    res.cookie('token', token)

    return res.status(201).json({ 
        message: 'User registered successfully', 
        user: {
            username,
            id: newuser._id,
            password
        }    
     });
}

async function loginController(req, res) {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
      
    const isPasswordValid = bcrypt.compare(password,user.password ); // In a real application, use bcrypt to hash and compare passwords
    
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message:"user logged in successfully",
        user: {
            username: user.username,
            id: user._id
        }
    })
}

module.exports = {
    registerController,
    loginController
};
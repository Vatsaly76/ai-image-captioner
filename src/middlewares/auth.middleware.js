const jwt = require("jsonwebtoken");

const userModel = require('../models/user.model');

async function authmiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, please login first"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Changed to uppercase JWT_SECRET

        const user = await userModel.findOne({
            _id: decoded.id  // Changed from decoded._id to decoded.id
        });

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
           
        }

        req.user = user;
        
        // Add your post creation logic here
        res.status(200).json({
            message: "Post route working",
            user: user
        });
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid token, please login again"
        });
    }
}    

module.exports = authmiddleware;
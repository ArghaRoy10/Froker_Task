const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    // Authorization header should be there during get user data and for borrowing money
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.json({success:false, message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 
        next(); 
    } catch (error) {
        console.error(error);
        res.json({ success:false, message: 'Invalid token' });
    }
};

module.exports = auth;

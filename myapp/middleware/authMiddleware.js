const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' })
            }

            next()

        } catch (error) {
            console.error('Token verification failed:', error)
            res.status(401).json({ message: 'Not authorized, token failed' })  
            return 
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
        return
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.type === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as admin');
    }
};

module.exports = { protect, admin };
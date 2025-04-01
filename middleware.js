require('dotenv').config();
const jwt = require('jsonwebtoken');

// CORS Middleware
const cors = require('cors');
const corsOptions = {
    origin: '*', // Change this for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// JSON Body Parser
const bodyParser = require('body-parser');

// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from headers
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user data to `req.user`
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { cors, corsOptions, bodyParser, authMiddleware };

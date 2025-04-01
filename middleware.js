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
    const token = req.header("Authorization");
      if (!token) return res.status(401).json({ message: "Access denied" });
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
      }
    // const token = req.headers['authorization'];
    // if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    // jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) return res.status(403).json({ success: false, message: 'Invalid token' });
    //     req.user = decoded;
    //     next();
    // });
};

module.exports = { cors, corsOptions, bodyParser, authMiddleware };

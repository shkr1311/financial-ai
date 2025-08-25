const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated, no token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to req
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res
      .status(401)
      .json({ message: 'Not authenticated, invalid token' });
  }
};

module.exports = protect;

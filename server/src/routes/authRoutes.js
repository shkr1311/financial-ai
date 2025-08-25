const express = require('express');
const {
  signIn,
  signUp,
  check,
  logout,
} = require('../controllers/authController.js');
const protect = require('../middlewares/protectRoute.js');
const router = express.Router();

router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

router.post('/logout', logout);

router.get('/check', protect, check);

module.exports = router;

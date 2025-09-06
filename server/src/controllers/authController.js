const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../utils/createToken');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate inputs
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and Password are required.' });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 4. Generate JWT token
    generateToken(user._id, res);

    // 5. Send response
    return res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('SignIn Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later.' });
  }
};

const signUp = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      confirmPassword,
      dob,
      gender,
      pan,
      aadhaar,
      address,
      city,
      state,
      pincode,
      occupation,
      income,
      termsAccepted,
    } = req.body;

    // 1. Validate required fields
    if (
      !fullName ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !dob ||
      !gender ||
      !pan ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        message: 'Please fill in all required fields.',
      });
    }

    // 2. Validate passwords
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // 3. Validate terms
    if (!termsAccepted) {
      return res
        .status(400)
        .json({ message: 'You must accept the Terms & Conditions.' });
    }

    // 4. Validate PAN
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan)) {
      return res.status(400).json({ message: 'Invalid PAN number format.' });
    }

    // 5. Validate age (18+)
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      return res
        .status(400)
        .json({ message: 'You must be 18 or older to register.' });
    }

    // 6. Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }, { pan }],
    });
    if (existingUser) {
      return res.status(409).json({
        message: 'User with this Email, Mobile or PAN already exists.',
      });
    }

    // 7. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 8. Create new user
    const newUser = new User({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      dob,
      gender,
      pan,
      aadhaar,
      address,
      city,
      state,
      pincode,
      occupation,
      income,
      termsAccepted,
      role: 'user', // 👈 default role
    });

    await newUser.save();

    // 9. Generate token (if using JWT auth)
    generateToken(newUser._id, res);

    return res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        mobile: newUser.mobile,
      },
    });
  } catch (error) {
    console.error('SignUp Error:', error);
    return res.status(500).json({
      message: 'Server error. Please try again later.',
    });
  }
};

const check = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // 🔍 Fetch the latest user data from DB (excluding password)
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Authenticated user retrieved successfully',
      user,
    });
  } catch (error) {
    console.error('Error in checkAuth controller:', error.message);
    return res.status(500).json({ message: 'Internal Server Error!' });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
    });

    return res.status(200).json({ message: 'Logged Out Successfully!' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

module.exports = {
  signIn,
  signUp,
  check,
  logout,
};

const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    pan: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    aadhaar: {
      type: String,
      unique: true,
      sparse: true, // Aadhaar optional, but must be unique if provided
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
    },
    income: {
      type: Number,
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, 
  }
);

const User = models.User || model('User', userSchema);

module.exports = User;

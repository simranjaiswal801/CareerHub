const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc    Get logged-in user's profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile fields (including resume/photo URLs)
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, location, bio, resumeUrl, profileImage } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (bio !== undefined) user.bio = bio;
    if (resumeUrl !== undefined) user.resumeUrl = resumeUrl;
    if (profileImage !== undefined) user.profileImage = profileImage;

    // Optional password change
    if (req.body.password) {
      if (req.body.password.length < 6) {
        res.status(400);
        throw new Error('Password must be at least 6 characters');
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };

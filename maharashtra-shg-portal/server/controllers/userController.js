const User = require('../models/User');
const Group = require('../models/Group');
const path = require('path');
const fs = require('fs');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: 'group',
      select: 'name code'
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create user
// @route   POST /api/users
// @access  Private
exports.createUser = async (req, res, next) => {
  try {
    // Check if group exists
    const group = await Group.findById(req.body.group);

    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found'
      });
    }

    // Handle file upload
    if (req.file) {
      req.body.photo = req.file.filename;
    }

    const user = await User.create(req.body);

    // Update group member count
    await Group.findByIdAndUpdate(req.body.group, {
      $inc: { totalMembers: 1 }
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Handle file upload
    if (req.file) {
      // Delete old photo if it exists and isn't the default
      if (user.photo !== 'no-photo.jpg') {
        const photoPath = path.join(__dirname, '..', 'uploads', user.photo);
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
      }
      req.body.photo = req.file.filename;
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Delete photo if it exists and isn't the default
    if (user.photo !== 'no-photo.jpg') {
      const photoPath = path.join(__dirname, '..', 'uploads', user.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await user.remove();

    // Update group member count
    await Group.findByIdAndUpdate(user.group, {
      $inc: { totalMembers: -1 }
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
const Group = require('../models/Group');
const User = require('../models/User');

// @desc    Get all groups
// @route   GET /api/groups
// @access  Public
exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();

    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single group
// @route   GET /api/groups/:id
// @access  Public
exports.getGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found'
      });
    }

    res.status(200).json({
      success: true,
      data: group
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get group by code
// @route   GET /api/groups/code/:code
// @access  Public
exports.getGroupByCode = async (req, res, next) => {
  try {
    const group = await Group.findOne({ code: req.params.code });

    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found'
      });
    }

    res.status(200).json({
      success: true,
      data: group
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new group
// @route   POST /api/groups
// @access  Public
exports.createGroup = async (req, res, next) => {
  try {
    const group = await Group.create(req.body);

    res.status(201).json({
      success: true,
      data: group
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update group
// @route   PUT /api/groups/:id
// @access  Private
exports.updateGroup = async (req, res, next) => {
  try {
    let group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found'
      });
    }

    // Make sure logged in group is the owner
    if (group._id.toString() !== req.group.id && req.group.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this group'
      });
    }

    group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: group
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get users in a group
// @route   GET /api/groups/:code/users
// @access  Public
exports.getGroupUsers = async (req, res, next) => {
  try {
    const group = await Group.findOne({ code: req.params.code });

    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found'
      });
    }

    const users = await User.find({ group: group._id });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};
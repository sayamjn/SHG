const Group = require('../models/Group');

// @desc    Login group
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { groupCode, password } = req.body;

    // Validate input
    if (!groupCode || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide group code and password'
      });
    }

    console.log(`Login attempt with groupCode: ${groupCode}`);

    // Fetch group (include password since select:false in schema)
    const group = await Group
      .findOne({ code: { $regex: new RegExp(`^${groupCode}$`, 'i') } })
      .select('+password');

    if (!group) {
      console.log(`Group not found with code: ${groupCode}`);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Plain-text password check (no bcrypt)
    if (group.password !== password) {
      console.log(`Password does not match for group: ${groupCode}`);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    console.log(`Login successful for group: ${groupCode}`);

    // Remove password before sending response
    group.password = undefined;

    // Respond with group data (or set up your session/token here)
    return res.status(200).json({
      success: true,
      data: group
    });
  } catch (err) {
    console.error(`Login error: ${err.message}`);
    next(err);
  }
};

// @desc    Get current logged in group
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    // Note: req.group must be set by your auth layer (e.g. session)
    const group = await Group.findById(req.group.id);
    return res.status(200).json({
      success: true,
      data: group
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Log group out
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  // If you have a session, destroy it here
  return res.status(200).json({
    success: true,
    data: {}
  });
};

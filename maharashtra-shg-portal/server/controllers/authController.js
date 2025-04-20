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

    // Simple session - just return the group info
    return res.status(200).json({
      success: true,
      token: group._id, // Use group ID as a simple token
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
    // Simple session check - expect group ID in Authorization header
    const groupId = req.headers.authorization ? 
      req.headers.authorization.replace('Bearer ', '') : null;
    
    if (!groupId) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
    
    const group = await Group.findById(groupId);
    
    if (!group) {
      return res.status(404).json({
        success: false,
        error: 'Group not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: group
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Log group out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  // Since we're not using JWT or sessions, just return success
  return res.status(200).json({
    success: true,
    data: {}
  });
};
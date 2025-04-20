// Protection middleware stub (JWT removed)
const Group = require('../models/Group');

// Protect routes (authentication logic removed)
exports.protect = async (req, res, next) => {
  try {
    // Authentication removed; assume req.group is set externally if needed
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

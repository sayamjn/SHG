const { check } = require('express-validator');

exports.loginValidation = [
  check('groupCode', 'Group code is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty()
];
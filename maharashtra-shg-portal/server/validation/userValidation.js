const { check } = require('express-validator');

exports.userCreateValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('address', 'Address is required').not().isEmpty(),
  check('age', 'Age is required and must be a number').isNumeric(),
  check('gender', 'Gender is required').isIn(['Male', 'Female', 'Other']),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('country', 'Country is required').not().isEmpty(),
  check('state', 'State is required').not().isEmpty(),
  check('city', 'City is required').not().isEmpty(),
  check('district', 'District is required').not().isEmpty(),
  check('taluka', 'Taluka is required').not().isEmpty(),
  check('group', 'Group is required').not().isEmpty()
];

exports.userUpdateValidation = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('address', 'Address is required').optional().not().isEmpty(),
  check('age', 'Age must be a number').optional().isNumeric(),
  check('gender', 'Gender must be Male, Female or Other').optional().isIn(['Male', 'Female', 'Other']),
  check('phone', 'Phone number is required').optional().not().isEmpty(),
  check('country', 'Country is required').optional().not().isEmpty(),
  check('state', 'State is required').optional().not().isEmpty(),
  check('city', 'City is required').optional().not().isEmpty(),
  check('district', 'District is required').optional().not().isEmpty(),
  check('taluka', 'Taluka is required').optional().not().isEmpty(),
  check('group', 'Group is required').optional().not().isEmpty()
];
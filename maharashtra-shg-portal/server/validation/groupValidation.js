const { check } = require('express-validator');

exports.groupCreateValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('code', 'Group code is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('address', 'Address is required').not().isEmpty(),
  check('country', 'Country is required').not().isEmpty(),
  check('state', 'State is required').not().isEmpty(),
  check('district', 'District is required').not().isEmpty(),
  check('taluka', 'Taluka is required').not().isEmpty(),
  check('contactPerson', 'Contact person is required').not().isEmpty(),
  check('phone', 'Phone number is required').not().isEmpty()
];

exports.groupUpdateValidation = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('code', 'Group code is required').optional().not().isEmpty(),
  check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }),
  check('address', 'Address is required').optional().not().isEmpty(),
  check('country', 'Country is required').optional().not().isEmpty(),
  check('state', 'State is required').optional().not().isEmpty(),
  check('district', 'District is required').optional().not().isEmpty(),
  check('taluka', 'Taluka is required').optional().not().isEmpty(),
  check('contactPerson', 'Contact person is required').optional().not().isEmpty(),
  check('phone', 'Phone number is required').optional().not().isEmpty()
];
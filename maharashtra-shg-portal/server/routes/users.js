const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { 
  userCreateValidation, 
  userUpdateValidation 
} = require('../validation/userValidation');
const validate = require('../middleware/validate');

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(
    upload.single('photo'),
    userCreateValidation,
    validate,
    createUser
  );

router.route('/:id')
  .get(getUser)
  .put(
    upload.single('photo'),
    userUpdateValidation,
    validate,
    updateUser
  )
  .delete( deleteUser);

module.exports = router;
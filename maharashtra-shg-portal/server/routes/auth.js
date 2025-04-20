const express = require('express');
const { login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { loginValidation } = require('../validation/authValidation');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/login', loginValidation, validate, login);
router.get('/me', getMe);
router.get('/logout', logout);

module.exports = router;
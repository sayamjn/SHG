const express = require('express');
const {
  getSchemes,
  getScheme,
  createScheme,
  updateScheme,
  deleteScheme
} = require('../controllers/schemeController');

const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
  .get(getSchemes)
  .post(
    upload.array('documents', 5),
    createScheme
  );

router.route('/:id')
  .get(getScheme)
  .put(
    upload.array('documents', 5),
    updateScheme
  )
  .delete(deleteScheme);

module.exports = router;
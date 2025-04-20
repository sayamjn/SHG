const express = require('express');
const {
  getGroups,
  getGroup,
  getGroupByCode,
  createGroup,
  updateGroup,
  getGroupUsers
} = require('../controllers/groupController');

const { protect } = require('../middleware/auth');
const { 
  groupCreateValidation, 
  groupUpdateValidation 
} = require('../validation/groupValidation');
const validate = require('../middleware/validate');

const router = express.Router();

router.route('/')
  .get(getGroups)
  .post(groupCreateValidation, validate, createGroup);

router.route('/:id')
  .get(getGroup)
  .put(groupUpdateValidation, validate, updateGroup);

router.get('/code/:code', getGroupByCode);
router.get('/:code/users', getGroupUsers);

module.exports = router;
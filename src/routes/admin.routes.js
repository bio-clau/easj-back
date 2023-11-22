const express = require('express');
const {
  getUsers,
  getUserVoter,
  getVoterNoUser
} = require('../controllers/admin.controller');

const router = express.Router();

router.route('/users/none')
.get(getVoterNoUser)

// router.route('/users')
// .get(getUsers)

// router.route('/users/:user_id')
// .get(getUserVoter)

module.exports = router
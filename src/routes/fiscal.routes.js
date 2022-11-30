const express = require('express');
const {
  getVoters,
  updateVoto
} = require('../controllers/fiscal.controller');

const router = express.Router();

router.route('/')
  .get(getVoters)

router.route('/:voter_id')
  .patch(updateVoto)

module.exports = router
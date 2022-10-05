const { Router } = require('express');
const express = require('express');
const {
  getAll,
  getOne,
  createOne,
  updateOne
} = require('../controllers/members.controller');
const router = express.Router();

router.route('/')
.get(getAll)
.post(createOne)
router.route('/:id')
.get(getOne)
.patch(updateOne)

module.exports = router
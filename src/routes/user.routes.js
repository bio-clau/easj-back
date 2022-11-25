const express = require('express');
const {
  getOne,
  createOne,
  updateOne,
  // deleteOne
} = require('../controllers/user.controller');

const router = express.Router();
router.route('/')
  .post(createOne)

router.route('/:user_id')
  .get(getOne)
  .patch(updateOne)
  // .delete(deleteOne)

module.exports = router
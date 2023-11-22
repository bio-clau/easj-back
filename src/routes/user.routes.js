const express = require('express');
const {
  getOne,
  createOne,
  updateOne,
  getMe
  // deleteOne
} = require('../controllers/user.controller');

const router = express.Router();
router.route('/')
  .post(createOne)

  router.route('/me')
    .get(getMe)
router.route('/:user_id')
  .get(getOne)
  // .patch(updateOne)
  // .delete(deleteOne)


module.exports = router
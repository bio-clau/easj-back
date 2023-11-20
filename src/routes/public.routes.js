const express = require('express');
const {status} = require('../controllers/public.controller');

const router = express.Router();

router.route('status')
.get(status)

module.exports = router
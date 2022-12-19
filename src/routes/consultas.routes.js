const express = require('express');
const { get } = require('mongoose');
const {consulta, consultaAll} = require('../controllers/consultas.controller')
const router = express.Router();

router.route('/user/:user_id')
.get(consulta)

router.route('/all')
.get(consultaAll)


module.exports = router
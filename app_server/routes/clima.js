const express = require('express');
const router = express.Router();
const climaApi = require('../controllers/climaApi');
const autorizado = require('../auth/autorizado');

router.get('/clima', autorizado, climaApi.getClima);

module.exports = router;

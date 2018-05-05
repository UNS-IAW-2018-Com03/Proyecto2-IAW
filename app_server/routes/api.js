const express = require('express');
const router = express.Router();
const reclamoRealizadoApi = require('../controllers/reclamoRealizadoAPI');
const reclamoTipoApi = require('../controllers/reclamoTipoAPI');
const autorizado = require('../auth/autorizado');


router.get('/reclamosTipo',reclamoTipoApi.getReclamosTipo);

router.get('/reclamosRealizados',autorizado,reclamoRealizadoApi.getReclamosRealizados);

router.post('/reclamosRealizados',autorizado,reclamoRealizadoApi.setReclamoRealizado);

module.exports = router;

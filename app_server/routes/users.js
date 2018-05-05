const express = require('express');
const router = express.Router();
const controllerUsers = require('../controllers/users');
const autorizado = require('../auth/autorizado');

router.get('/logout',controllerUsers.salir);

router.get('/auth/google',controllerUsers.google);

router.get('/auth/google/callback',controllerUsers.googleAuth, controllerUsers.googleCallback);

router.get('/estilo',autorizado,controllerUsers.getEstilo);

router.post('/estilo',autorizado,controllerUsers.setEstilo);

module.exports = router;

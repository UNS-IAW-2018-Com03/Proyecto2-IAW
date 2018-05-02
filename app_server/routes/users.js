const express = require('express');
const router = express.Router();
const controllerUsers = require('../controllers/users');

router.get('/signUp',controllerUsers.singUpPage);

router.post('/submit',controllerUsers.nuevoUsuario);

router.get('/logout',controllerUsers.salir);

router.post('/login',controllerUsers.ingresar);

module.exports = router;

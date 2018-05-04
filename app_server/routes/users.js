const express = require('express');
const router = express.Router();
const controllerUsers = require('../controllers/users');

router.get('/logout',controllerUsers.salir);

router.get('/auth/google',controllerUsers.google);

router.get('/auth/google/callback',controllerUsers.googleAuth, controllerUsers.googleCallback);

module.exports = router;

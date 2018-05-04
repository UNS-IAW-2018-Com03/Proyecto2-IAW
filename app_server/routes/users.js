const express = require('express');
const router = express.Router();
const controllerUsers = require('../controllers/users');

router.get('/logout',controllerUsers.salir);

router.get('/auth/facebook',controllerUsers.facebook);

router.get('/auth/facebook/callback',controllerUsers.facebookAuth, controllerUsers.facebookCallback);

module.exports = router;

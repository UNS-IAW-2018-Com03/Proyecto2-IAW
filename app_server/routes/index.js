const express = require('express');
const router = express.Router();
const controllerMain = require('../controllers/main');

//Rutas
router.get('/', controllerMain.homePage);

router.get('/readme',controllerMain.readmePage);

module.exports = router;

const express = require('express');
const router = express.Router();
const vista = require('public/js/vistaMap.js');
var success = null;
//Rutas
router.get('/', (req, res) => {
  res.render('index.ejs', {success: req.session.success});

});

router.get('/singUp', (req, res) => {
  res.render('singUp.ejs',{errors: req.session.errors});
  req.session.errors = null;
});

router.post('/submit',(req, res) => {
  req.check('email','Direccion de e-mail invalida').isEmail();
  req.check('password','Contraseña invalida').isLength({min: 4}).equals(req.body.confirmPassword);
  var errors = req.validationErrors();
  var dir = '';
  if(errors){
    req.session.errors = errors;
    req.session.success = false;
    dir = '/singUp';
    vista.mostrarErrores(errors);
  }else{
    req.session.success = true;
    dir = '/';
  }
  res.redirect(dir);
});

router.get('/logout', (req, res) => {
  req.session.success = false;
  res.redirect('/');
});

module.exports = router;

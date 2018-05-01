//const funcionesVista = require('../js/funcionesVista');
const db = require('../models/db');
/* GET singUp page. */
const singUpPage = function (req, res){
  res.render('signUp.ejs',{errors: req.session.errors});
  req.session.errors = null;
};

/*Crear nuevo usuario*/
const nuevoUsuario = function (req, res){
  req.check('email','Direccion de e-mail invalida').isEmail();
  req.check('password','Contraseña invalida').isLength({min: 4}).equals(req.body.confirmPassword);
  var errors = req.validationErrors();
  var dir = '';
  if(errors){
    req.session.errors = errors;
    req.session.success = false;
    dir = '/signUp';
    //funcionesVista.mostrarErrores(errors);
  }else{
    req.session.success = true;
    console.log(req.body.username+" "+req.body.email+" "+req.body.password);
    db.crearUsuario(req.body.username,req.body.email,req.body.password);
    dir = '/';
  }
  res.redirect(dir);
};

/*Logout*/
const salir =  function (req, res){
  req.session.success = false;
  res.redirect('/');
};


module.exports = {
  singUpPage,
  nuevoUsuario,
  salir
}

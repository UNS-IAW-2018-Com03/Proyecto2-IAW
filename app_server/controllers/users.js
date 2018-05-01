//const funcionesVista = require('../js/funcionesVista');
var Usuario = require('../models/usuario');

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
    var newUser = new Usuario();
    newUser.local.nombre = req.body.username;
    newUser.local.email = req.body.email;
    newUser.local.password = req.body.password;
    newUser.save(function(err){
      if(err)
        throw err;
    });
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

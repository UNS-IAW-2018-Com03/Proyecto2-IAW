const db = require('../models/db');

/* GET singUp page. */
const singUpPage = function (req, res){
  res.render('signUp.ejs',{
    message1 : req.flash('errorMailInvalido'),
    message2 : req.flash('errorPasswordInvalido'),
    message3 : req.flash('errorMailUsado')
  });
  req.session.errors = null;
};

/*Crear nuevo usuario*/
const nuevoUsuario = function (req, res){
  req.check('email','Direccion de e-mail invalida').isEmail();
  req.check('password','Contraseña invalida').isLength({min: 4}).equals(req.body.confirmPassword);
  var errors = req.validationErrors();
  var dir = '';
  var errores;
  if(errors){
    if(errors[0]){
        req.flash('errorMailInvalido',errors[0].msg);
    }
    if(errors[1]){
        req.flash('errorPasswordInvalido',errors[1].msg);
    }
    req.session.success = false;
    dir = '/signUp';
  }else{
    var user = db.buscarUsuario(req.body.email);
    if( user != null){
      req.flash('errorMailUsado','El email ya ha sido utilizado');
      req.session.success = false;
      dir = '/signUp';
    }else{
      db.crearUsuario(req.body.username,req.body.email,req.body.password);
      req.session.success = true;
      dir = '/';
    }
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

const db = require('../models/db');

/* GET signUp page. */
const signUpPage = function (req, res){
  res.render('signUp.ejs',{
    success: req.session.success,
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
    res.redirect('/signUp');
  }else{
    db.Usuario
      .findOne({'local.email': req.body.email})
      .exec((err, user) => {
        if (user != null) {
          req.flash('errorMailUsado','El email ya ha sido utilizado');
          req.session.success = false;
          res.redirect('/signUp');
        }else {
          var newUser = db.crearUsuario(req.body.username,req.body.email,req.body.password);
          console.log(newUser);
          newUser.save( function(err){
            if(err){
                throw err;
            }else{
              req.session.success = true;
              console.log('Creado con exito re pillo mal locon');
              res.redirect('/');
            }
          });
        }
    });
  }
};

/*Logout*/
const salir =  function (req, res){
  req.session.success = false;
  res.redirect('/');
};

/*Login*/
const ingresar = function(req,res){
    db.Usuario
      .findOne({'local.email': req.body.email,'local.password': req.body.password})
      .exec((err, user) => {
        if (user == null) {
          req.flash('errorLogin','Error Login - Ingrese bien los datos');
          req.session.success = false;
          //mongoose.disconnect();
        } else {
          req.session.success = true;
        }
        res.redirect('/');
    });
};



module.exports = {
  signUpPage,
  nuevoUsuario,
  salir,
  ingresar
}

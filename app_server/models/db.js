const mongoose = require('mongoose');
const url = 'mongodb://localhost/test';
const Usuario = require('../models/usuario');


const crearUsuario = async function(nombre,email,password){
    mongoose.connect(url);
    var newUser = new Usuario();
    newUser.local.nombre = nombre;
    newUser.local.email = email;
    newUser.local.password = password;
    newUser.save( function(err){
      if(err){
          throw err;
          mongoose.disconnect();
      }else{
          mongoose.disconnect();
      }
    });
};

const buscarUsuario = async function(email){
  mongoose.connect(url);
  var ret = null;
  process.nextTick(function(){
    Usuario.findOne({'local.email': email},function(err,user){
      if(err)
        throw err;
      if(user){
        console.log(user);
        ret = user;
      }
      mongoose.disconnect();
    })
  });
  return ret;
};

module.exports = {
  crearUsuario,
  buscarUsuario
}

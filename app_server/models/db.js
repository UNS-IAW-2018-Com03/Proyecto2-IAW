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

const buscarUsuarioEmail = async function(email){
  mongoose.connect(url);
  var ret = null;
  process.nextTick(function(){
    Usuario.findOne({'local.email': email},function(err,user){
      if(err){
        console.log(err);
        throw err;
      }
      if(user){
        ret = user;
      }
      mongoose.disconnect();
    })
  });
  return ret;
};

const buscarUsuarioEmailPassword = async function(email, password){
  mongoose.connect(url);
  var ret = null;
  process.nextTick(function(){
    Usuario.findOne({'local.email': email, 'local.password': password},function(err,user){
      if(err)
        throw err;
      if(user){
        ret = user;
      }
      mongoose.disconnect();
    })
  });
  return ret;
};

module.exports = {
  crearUsuario,
  buscarUsuarioEmail,
  buscarUsuarioEmailPassword
}

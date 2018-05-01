const mongoose = require('mongoose');
const url = 'mongodb://localhost/test';
const Usuario = require('../models/usuario');


const crearUsuario = function(nombre,email,password){
    mongoose.connect(url);
    var newUser = new Usuario();
    newUser.local.nombre = nombre;
    newUser.local.email = email;
    newUser.local.password = password;
    newUser.save( function(err){
      if(err){
        throw err;
        mongoose.disconnect();
      }else {
        mongoose.disconnect();
      }
    });
};

module.exports = {
  crearUsuario
}

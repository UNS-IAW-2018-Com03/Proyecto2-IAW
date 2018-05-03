const mongoose = require('mongoose').set('debug',true);
const url = 'mongodb://localhost/test';
const Usuario = require('../models/usuario');
const ReclamoTipo = require('../models/reclamoTipo');
const ReclamoRealizado = require('../models/reclamoRealizado');

mongoose.connect(url);

function crearUsuario(nombre,email,password){
    var user = new Usuario();
    console.log('entre crear');
    user.local.nombre = nombre;
    user.local.email = email;
    user.local.password = password;
    console.log('llene el user');
    return user
};


const buscarReclamosTipo = function(){

};

const buscarReclamosRealizado = function(idUser){

};

const agregarReclamoRealizado = function(idUser, tipoReclamo, lat, lng, descripcion){

};

module.exports = {
  Usuario,
  crearUsuario
}

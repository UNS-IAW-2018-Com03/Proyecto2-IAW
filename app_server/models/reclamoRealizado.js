const mongoose = require('mongoose');

const reclamoRealizadoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  latitud:{
    type: Number,
    requiere: true
  },
  longitud:{
    type: Number,
    requiere: true
  },
  fecha:{
    type: String,
    requiere: true
  },
  user:{
    type: String,
    requiere: true
  },
  estado:{
    type: String,
    requiere: true
  }
});

module.exports = mongoose.model('ReclamoRealizado', reclamoRealizadoSchema);

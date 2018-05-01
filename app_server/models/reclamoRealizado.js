const mongoose = require('mongoose');

const reclamoRealizadoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
});

mongoose.model('reclamoRealizado', reclamoRealizadoSchema);

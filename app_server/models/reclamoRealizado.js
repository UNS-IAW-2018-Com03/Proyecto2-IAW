const mongoose = require('mongoose');

const reclamoRealizadoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  coords:{
    type: [Number],
    requiere: true,
    index: '2dsphere'
  },
  propietario:{
    type: String,
    requiere: true
  }
});

mongoose.model('ReclamoRealizado', reclamoRealizadoSchema);

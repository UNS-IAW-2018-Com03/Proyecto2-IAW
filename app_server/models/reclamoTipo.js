const mongoose = require('mongoose');

const reclamoTipoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  precio: Number
});

module.exports = mongoose.model('ReclamoTipo', reclamoTipoSchema);

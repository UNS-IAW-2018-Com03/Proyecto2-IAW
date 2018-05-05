const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  google: {
    id: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  estilo:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);

const mongoose = require('mongoose');

const VoterSchema = mongoose.Schema({
  documento: {
    type: Number
  },
  apellidoNombre: {
    type: String
  },
  matricula:{
    type: Number
  },
  voto:{
    type: Boolean,
    default: false
  },
  telefono_aux: {
    type: String
  },
  n: {
    type: Number
  }
});

const Voter = mongoose.model('Voter', VoterSchema);
module.exports = Voter;
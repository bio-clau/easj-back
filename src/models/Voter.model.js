const mongoose = require('mongoose');

const VoterSchema = mongoose.Schema({
  documento: {
    type: Number
  },
  nd: {
    type: Number
  },
  nj:{
    type: Number
  },
  apellidoNombre: {
    type: String
  },
  matricula:{
    type: Number
  },
  tel: {
    type: Number
  },
  voto:{
    type: Boolean,
    default: false
  },
  obs: {
    type: String
  }
});

const Voter = mongoose.model('Voter', VoterSchema);
module.exports = Voter;
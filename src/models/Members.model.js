const mongoose = require('mongoose');

const MembersSchema = mongoose.Schema({
  documento: {
    type: Number
  },
  tipo: {
    type: String
  },
  tomo: {
    type: Number
  },
  folio: {
    type: Number
  },
  apellidoNombre: {
    type: String
  },
  matricula:{
    type: Number
  },
  direccion: {
    type: String
  },
  observacion: {
    type: String,
    default:''
  },
  calificativo:{
    type: String,
    enum:['SIN', 'NOS', 'ELLOS', 'INHAB']
  },
  voto:{
    type: Boolean,
    default: false
  },
  telefono: {
    type: String
  },
  lugar: {
    type: String
  },
  correo: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email no valido",
    ]
  }
});

const Members = mongoose.model('Members', MembersSchema);
module.exports = Members;
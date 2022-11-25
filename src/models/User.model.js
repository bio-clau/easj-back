const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  member_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Voter'
  },
  calificativo: {
    type: String,
    enum:['SIN', 'NOS', 'ELLOS', 'INHAB']
  },
  ELLOSnos:{
    type: Boolean
  },
  INHABnos: {
    type: Boolean
  },
  observacion: {
    type: String,
    default:''
  },
  telefono: {
    type: String
  },

})

const UserSchema = mongoose.Schema({
  user_id: {
    type: String,
    unique: true
  },
  user_name: {
    type: String
  },
  role: {
    type: String
  },
  voter_info: [PersonSchema]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
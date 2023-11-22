const mongoose = require('mongoose');


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
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
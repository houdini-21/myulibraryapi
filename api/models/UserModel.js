const mongoose = require('mongoose');

const UserModel = mongoose.model('Users', {
  userId: String,
  name: String,
  lastname: String,
  email: String,
  role: Number,
  password: String,
});

module.exports = UserModel;

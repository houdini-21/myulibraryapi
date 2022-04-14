const mongoose = require('mongoose');

const UserModel = mongoose.model('Users', {
  userId: String,
  name: String,
  lastname: String,
  email: String,
  role: String,
  password: String,
});

module.exports = UserModel;

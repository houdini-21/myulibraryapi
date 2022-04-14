const uuid = require('uuid');
const crypt = require('../libs/crypt/crypt');
const UserModel = require('../models/UserModel');
const { to } = require('../libs/to/to');

const registerUser = (data) => {
  return new Promise(async (resolve, reject) => {
    let { name, lastname, email, role, password } = data;
    UserModel.find({
      email: email,
    }).then((user) => {
      if (user.length > 0) {
        return reject('Email already in use');
      } else {
        let hashedPwd = crypt.hashPasswordSync(password);
        // Guardar en la base de datos nuestro usuario
        let userId = uuid.v4();
        let newUser = new UserModel({
          userId: userId,
          name: name,
          lastname: lastname,
          email: email,
          role: role,
          password: hashedPwd,
        });
        newUser.save();
      }
      resolve(resolve);
    });
  });
};

const getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(UserModel.findOne({ userId: userId }).exec());
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
};

const getUserIdFromEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(UserModel.findOne({ email: email }).exec());
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
};

const checkUserCredentials = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let [err, user] = await to(getUserIdFromEmail(email));
    if (!err || user) {
      crypt.comparePassword(password, user.password, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      reject(err);
    }
  });
};
exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromEmail = getUserIdFromEmail;
exports.getUser = getUser;

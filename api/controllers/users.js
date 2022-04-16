const uuid = require("uuid");
const crypt = require("../libs/crypt/crypt");
const UserModel = require("../models/UserModel");
const { to } = require("../libs/to/to");

const registerUser = (data) => {
  return new Promise(async (resolve, reject) => {
    //request to check that the email to be used for the new user does not exist
    let { name, lastname, email, role, password } = data;
    UserModel.find({
      email: email,
    })
      .then((user) => {
        if (user.length > 0) {
          return reject("Email already in use");
        } else {
          //if the email is not in use, we proceed to create the new user
          // and encrypt the password
          let hashedPwd = crypt.hashPasswordSync(password);
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
      })
      .catch((err) => {
        reject(err);
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
  //request to get the user id from the email
  return new Promise(async (resolve, reject) => {
    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    });
  });
};

const checkUserCredentials = (email, password) => {
  //request to check that the user credentials are correct
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

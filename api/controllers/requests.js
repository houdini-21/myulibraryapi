const uuid = require("uuid");
const crypt = require("../libs/crypt/crypt");
const RequestedModel = require("../models/RequestedModel");
const { to } = require("../libs/to/to");

const addRequestedBook = (data) => {
  return new Promise(async (resolve, reject) => {
    let { idBook, idStudent } = data;
    let newRequestedBook = new RequestedModel({
      idBook: idBook,
      idStudent: idStudent,
      dateRequest: Date.now(),
      status: false,
    });
    newRequestedBook.save();
    resolve(resolve);
  });
};

// update requestedBook by id
const updateRequestedBook = (id) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(
      RequestedModel.findOneAndUpdate(
        { _id: id },
        { status: true, dateReturn: Date.now() }
      ).exec()
    );
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
};

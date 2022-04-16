const RequestedModel = require("../models/RequestedModel");
const BooksModel = require("../models/BooksModel");
const { to } = require("../libs/to/to");

const RequestedBook = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let { idBook, idStudent } = req.body;

    BooksModel.findOne({ _id: idBook })
      .then((book) => {
        if (book.stock > 0) {
          book.stock = book.stock - 1;
          book.save();

          let newRequestedBook = new RequestedModel({
            idBook: req.sanitize(idBook),
            idStudent: req.sanitize(idStudent),
            dateRequest: Date.now(),
            status: false,
          });
          newRequestedBook.save();
          resolve(
            res.status(200).json({ message: "Book requested successful" })
          );
        } else {
          resolve(res.status(401).json({ message: "Book out of stock" }));
        }
      })
      .catch((err) => {
        reject(
          res
            .status(401)
            .json({ message: "Internal server error", details: err.message })
        );
      });
  });
};

const ReturnBook = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let id = req.params.idRequest;
    let [err, result] = await to(
      RequestedModel.findOneAndUpdate(
        { _id: id },
        { status: true, dateReturn: Date.now() }
      ).exec()
    );
    if (err) {
      return reject(err);
    }

    let [err2, result2] = await to(
      BooksModel.findOneAndUpdate(
        { _id: result.idBook },
        { $inc: { stock: 1 } },
        { new: true }
      )
    );
    if (err2) {
      return reject(err2);
    }

    resolve(res.status(200).json({ message: "Book returned successful" }));
  });
};

const getMyRequest = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let idStudent = req.sanitize(req.body.idStudent);
    let page = req.params.page;
    let limit = 8;
    let offset = (page - 1) * limit;
    let numPages = 1;
    //get quantity of books and divide by limit to get the number of pages
    const count = await BooksModel.countDocuments({ idStudent: idStudent });
    numPages = Math.ceil(count / limit);

    let [err, result] = await to(
      RequestedModel.find({ idStudent: idStudent })
        .populate("idBook")
        .skip(offset)
        .limit(limit)
        .exec()
    );
    if (err) {
      reject(res.status(401).json({ message: "Internal server error", details: err.message }));
    }

    resolve(res.status(200).json({ numPages: numPages, books: result }));
  });
};

//getRequestedBooks
const getRequestedBooks = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let page = req.params.page;
    let { idStudent } = req.body;
    let limit = 8;
    let offset = (page - 1) * limit;
    let query = {};
    if (idStudent) {
      query = { idStudent: idStudent };
    }

    let [err, result] = await to(
      RequestedModel.find(query)
        .populate("idBook")
        .populate("idStudent")
        .skip(offset)
        .limit(limit)
        .exec()
    );
    if (err) {
      return reject(err);
    }

    resolve(res.status(200).json({ books: result }));
  });
};

exports.RequestedBook = RequestedBook;
exports.ReturnBook = ReturnBook;
exports.getMyRequest = getMyRequest;
exports.getRequestedBooks = getRequestedBooks;

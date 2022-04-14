const uuid = require("uuid");
const BooksModel = require("../models/BooksModel");

const addNewBook = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let { title, author, publishedYear, genre, stock } = req.body;
    BooksModel.find({
      title: title,
      author: author,
      publishedYear: publishedYear,
      genre: genre,
      stock: stock,
    }).then((book) => {
      if (book.length > 0) {
        resolve(res.status(401).json({ message: "Book already exists" }));
      } else {
        let bookId = uuid.v4();
        let newBook = new BooksModel({
          bookId: bookId,
          title: title,
          author: author,
          publishedYear: publishedYear,
          genre: genre,
          stock: stock,
        });
        newBook.save();
        resolve(res.status(200).json({ message: "Book added" }));
      }
    });
  });
};

//lower stock of books by 1 and return the updated book
const lowerStock = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let { idBook } = req.params;
    BooksModel.findOne({ bookId: idBook }).then((book) => {
      if (book) {
        if (book.stock > 0) {
          book.stock = book.stock - 1;
          book.save();
          resolve(res.status(200).json({ message: "Book stock lowered" }));
        } else {
          resolve(res.status(401).json({ message: "Book out of stock" }));
        }
      } else {
        resolve(res.status(401).json({ message: "Book not found" }));
      }
    });
  });
};

//increase stock of books by 1 and return the updated book
const increaseStock = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let { idBook } = req.params;
    BooksModel.findOne({ bookId: idBook }).then((book) => {
      if (book) {
        book.stock = book.stock + 1;
        book.save();
        resolve(res.status(200).json({ message: "Book stock increased" }));
      } else {
        resolve(res.status(401).json({ message: "Book not found" }));
      }
    });
  });
};

exports.addNewBook = addNewBook;
exports.lowerStock = lowerStock;
exports.increaseStock = increaseStock;

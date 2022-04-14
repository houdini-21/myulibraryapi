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
        return reject("Book is already added");
      } else {
        let newBook = new BooksModel({
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

exports.addNewBook = addNewBook;

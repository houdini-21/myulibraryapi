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

//lower stock of books by 1 and return the updated book
const lowerStock = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let { idBook } = req.params;
    BooksModel.findById(idBook).then((book) => {
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
    BooksModel.findById(idBook).then((book) => {
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

//get list of books by pagination
const getBooksByPagination = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let { page } = req.params;
    let limit = 1;
    let offset = (page - 1) * limit;
    BooksModel.find({})
      .skip(offset)
      .limit(limit)
      .then((books) => {
        if (books.length > 0) {
          resolve(res.status(200).json({ books: books }));
        } else {
          resolve(res.status(401).json({ message: "No books found" }));
        }
      });
  });
};

const getBooks = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    BooksModel.find().then((books) => {
      resolve(res.status(200).json({ books: books }));
    });
  });
};

//get book by id
const getBookById = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let { idBook } = req.params;
    BooksModel.findById(idBook).then((book) => {
      if (book) {
        resolve(res.status(200).json(book));
      } else {
        resolve(res.status(401).json({ message: "Book not found" }));
      }
    });
  });
};

exports.addNewBook = addNewBook;
exports.lowerStock = lowerStock;
exports.increaseStock = increaseStock;
exports.getBooks = getBooks;
exports.getBooksByPagination = getBooksByPagination;
exports.getBookById = getBookById;

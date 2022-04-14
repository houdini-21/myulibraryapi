const uuid = require("uuid");
const BooksModel = require("../models/BooksModel");

const addNewBook = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let { title, author, publishedYear, genre, stock } = req.body;
    if (!title || !author || !publishedYear || !genre || !stock || stock <= 0) {
      return reject(res.status(400).json({ message: "Missing data" }));
    }
    BooksModel.find({
      title: title,
      author: author,
      publishedYear: publishedYear,
      genre: genre,
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

//search book by title, author or publishedYear or genre
const searchBook = (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    let { title, author, publishedYear, genre } = req.body;
    if (!title && !author && !publishedYear && !genre) {
      return reject(res.status(400).json({ message: "Missing data" }));
    }

    let query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }
    if (publishedYear) {
      query.publishedYear = publishedYear;
    }
    if (genre) {
      query.genre = genre;
    }

    BooksModel.find(query).then((books) => {
      if (books.length > 0) {
        resolve(res.status(200).json({ books: books }));
      } else {
        resolve(res.status(401).json({ message: "No books found" }));
      }
    });
  });
};

exports.addNewBook = addNewBook;
exports.searchBook = searchBook;
exports.getBooks = getBooks;
exports.getBooksByPagination = getBooksByPagination;
exports.getBookById = getBookById;

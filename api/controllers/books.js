const uuid = require("uuid");
const BooksModel = require("../models/BooksModel");

const addNewBook = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { title, author, publishedYear, genre, stock } = req.body;
    if (!title || !author || !publishedYear || !genre || !stock || stock <= 0) {
      resolve(res.status(400).json({ message: "Missing data" }));
    } else {
      BooksModel.find({
        title: req.sanitize(title),
        author: req.sanitize(author),
        publishedYear: req.sanitize(publishedYear),
        genre: req.sanitize(genre),
      })
        .then((book) => {
          if (book.length > 0) {
            resolve(res.status(401).json({ message: "Book already exists" }));
          } else {
            let newBook = new BooksModel({
              title: req.sanitize(title),
              author: req.sanitize(author),
              publishedYear: req.sanitize(publishedYear),
              genre: req.sanitize(genre),
              stock: req.sanitize(stock),
            });
            newBook.save();
            resolve(res.status(200).json({ message: "Book added" }));
          }
        })
        .catch((err) => {
          reject(
            res
              .status(500)
              .json({ message: "Internal server error", details: err.message })
          );
        });
    }
  });
};

const getBooksByPagination = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { page } = req.params;
    let limit = 8;
    let offset = (page - 1) * limit;

    let numPages = 1;
    //get quantity of books and divide by limit to get the number of pages
    const count = await BooksModel.countDocuments();
    numPages = Math.ceil(count / limit);
    //get all books and if doesn't exist return an message
    BooksModel.find({})
      .skip(offset)
      .limit(limit)
      .then((books) => {
        if (books.length > 0) {
          resolve(res.status(200).json({ numPages: numPages, books: books }));
        } else {
          resolve(res.status(401).json({ message: "No books found" }));
        }
      })
      .catch((err) => {
        reject(
          res
            .status(500)
            .json({ message: "Internal server error", details: err.message })
        );
      });
  });
};

const getBooks = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { page } = req.params;
    let limit = 8;
    let offset = (page - 1) * limit;

    let numPages = 1;
    //get quantity of books and divide by limit to get the number of pages
    const count = await BooksModel.countDocuments();
    numPages = Math.ceil(count / limit);
    //get all books and if doesn't exist return an message

    BooksModel.find({})
      .skip(offset)
      .limit(limit)
      .then((books) => {
        if (books.length > 0) {
          resolve(res.status(200).json({ numPages: numPages, books: books }));
        } else {
          resolve(res.status(200).json({ message: "No books found" }));
        }
      })
      .catch((err) => {
        reject(
          res
            .status(500)
            .json({ message: "Internal server error", details: err.message })
        );
      });
  });
};

const getBookById = (req, res) => {
  //request to get a book by id and if doesn't exist return an message
  return new Promise(async (resolve, reject) => {
    let { idBook } = req.params;
    BooksModel.findById(idBook)
      .then((book) => {
        if (book) {
          resolve(res.status(200).json(book));
        } else {
          resolve(res.status(401).json({ message: "Book not found" }));
        }
      })
      .catch((err) => {
        reject(
          res
            .status(500)
            .json({ message: "Internal server error", details: err.message })
        );
      });
  });
};

const searchBook = (req, res) => {
  //request to search a book by titlem author, publishedYear, genre and if doesn't exist return an message
  return new Promise(async (resolve, reject) => {
    let { title, author, publishedYear, genre } = req.body;
    let { page } = req.params;

    let limit = 8;
    let offset = (page - 1) * limit;

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
      query.genre = { $regex: genre, $options: "i" };
    }
    let numPages = 1;
    //get quantity of books and divide by limit to get the number of pages
    const count = await BooksModel.countDocuments(query);
    numPages = Math.ceil(count / limit);

    BooksModel.find(query)
      .skip(offset)
      .limit(limit)
      .then((books) => {
        if (books.length > 0) {
          resolve(res.status(200).json({ numPages: numPages, books: books }));
        } else {
          resolve(res.status(401).json({ message: "No books found" }));
        }
      })
      .catch((err) => {
        reject(
          res
            .status(500)
            .json({ message: "Internal server error", details: err.message })
        );
      });
  });
};

exports.addNewBook = addNewBook;
exports.searchBook = searchBook;
exports.getBooks = getBooks;
exports.getBooksByPagination = getBooksByPagination;
exports.getBookById = getBookById;

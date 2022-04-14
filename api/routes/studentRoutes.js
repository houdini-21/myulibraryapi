const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const booksHttpHandler = require("../controllers/books");

router
  .route("/books")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBooks);

router
  .route("/books/:page")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBooksByPagination);

router
  .route("/books/details/:idBook")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBookById); 

router
  .route("/requestedBook/:idBook")
  .get(middlewares.protectWithJwt, booksHttpHandler.lowerStock);

exports.router = router;

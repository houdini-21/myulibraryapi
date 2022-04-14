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
  .route("/requestedBook/:idBook")
  .get(middlewares.protectWithJwt, booksHttpHandler.lowerStock);

router
  .route("/returnBook/:idBook")
  .get(middlewares.protectWithJwt, booksHttpHandler.increaseStock);

exports.router = router;

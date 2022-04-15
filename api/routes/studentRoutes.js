const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const requestsHttpHandler = require("../controllers/requests");
const booksHttpHandler = require("../controllers/books");

router
  .route("/books")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBooks);

/**
 * router
  .route("/books/:page")
  .post(middlewares.protectWithJwt, booksHttpHandler.getBooksByPagination);

 */
router
  .route("/books/:page")
  .post(middlewares.protectWithJwt, booksHttpHandler.searchBook);

router
  .route("/books/details/:idBook")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBookById);

router
  .route("/books/requestedBook")
  .post(middlewares.protectWithJwt, requestsHttpHandler.RequestedBook);

exports.router = router;

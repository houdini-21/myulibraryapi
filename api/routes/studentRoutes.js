const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const requestsHttpHandler = require("../controllers/requests");
const booksHttpHandler = require("../controllers/books");

router
  .route("/books")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBooks);

router
  .route("/books/:page")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBooksByPagination);

router
  .route("/books/search/:page")
  .post(middlewares.protectWithJwt, booksHttpHandler.searchBook);

router
  .route("/books/details/:idBook")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBookById);

router
  .route("/books/requestbook")
  .post(middlewares.protectWithJwt, requestsHttpHandler.RequestBook);

router
  .route("/books/myrequests/:page")
  .post(middlewares.protectWithJwt, requestsHttpHandler.getMyRequest);

exports.router = router;

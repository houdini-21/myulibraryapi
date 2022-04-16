const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const booksHttpHandler = require("../controllers/books");
const requestsHttpHandler = require("../controllers/requests");
const authHttpHandler = require("../libs/auth/auth");

router.get(
  "/getBooks/:page",
  middlewares.isLibrarian,
  booksHttpHandler.getBooks
);

router
  .route("/getRequestedBooks/:page")
  .post(middlewares.isLibrarian, requestsHttpHandler.getRequestedBooks);

router.route("/add").post(middlewares.isLibrarian, booksHttpHandler.addNewBook);

router
  .route("/createUsers")
  .post(middlewares.isLibrarian, authHttpHandler.createUser);

  router
  .route("/books/details/:idBook")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBookById);

router
  .route("/returnBook")
  .post(middlewares.isLibrarian, requestsHttpHandler.ReturnBook);

router
  .route("/requestBookDetail/:requestId")
  .get(middlewares.isLibrarian, requestsHttpHandler.getRequestById);

exports.router = router;

const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const booksHttpHandler = require("../controllers/books");
const authHttpHandler = require("../libs/auth/auth");

router.get("/", middlewares.isLibrarian, (req, res) => {
  res.send("Admin books");
});

router.route("/add").post(middlewares.isLibrarian, booksHttpHandler.addNewBook);

router
  .route("/createUsers")
  .post(middlewares.isLibrarian, authHttpHandler.createUser);



exports.router = router;

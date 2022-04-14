const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const booksHttpHandler = require("../controllers/books");


router.get("/", middlewares.isLibrarian, (req, res) => {
  res.send("Admin books");
});


router.route('/add').post(middlewares.isLibrarian, booksHttpHandler.addNewBook);

router.route('/lower/:idBook').get(middlewares.isLibrarian, booksHttpHandler.lowerStock);

router.route('/increase/:idBook').get(middlewares.isLibrarian, booksHttpHandler.increaseStock);

exports.router = router;


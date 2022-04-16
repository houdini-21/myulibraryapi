const express = require("express");
const middlewares = require("./libs/middleware/middleware");
const authRoutes = require("./routes/authRoutes").router;
const librarianRoutes = require("./routes/librarianRoutes").router;
const studentRoutes = require("./routes/studentRoutes").router;
const expressSanitizer = require('express-sanitizer');
const app = express();
const PORT = 3001;

var cors = require("cors");

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(expressSanitizer());
require("./libs/database/database");

middlewares.setupMiddleware(app);

app.use("/auth", authRoutes);
app.use("/librarian/", librarianRoutes);
app.use("/student/", studentRoutes);

app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));

exports.app = app;

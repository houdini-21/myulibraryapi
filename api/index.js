const express = require("express");
const middlewares = require("./libs/middleware/middleware");
const authRoutes = require("./routes/authRoutes").router;
const librarianRoutes = require("./routes/librarianRoutes").router;
const studentRoutes = require("./routes/studentRoutes").router;
const expressSanitizer = require('express-sanitizer');
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
dotenv.config();

const app = express();


const PORT = 3001;

var cors = require("cors");

app.use(expressSanitizer());
app.use(fileUpload())
app.use('/uploads', express.static('uploads'));
app.use(cors());



middlewares.setupMiddleware(app);

require("./libs/database/database");

app.use("/auth", authRoutes);
app.use("/librarian/", librarianRoutes);
app.use("/student/", studentRoutes);

app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));

exports.app = app;

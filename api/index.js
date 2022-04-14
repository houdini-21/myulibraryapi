const express = require('express');
const middlewares = require('./libs/middleware/middleware');
const authRoutes = require('./routes/authRoutes').router;
const librarianRoutes = require('./routes/librarianRoutes').router;
const studentRoutes = require('./routes/studentRoutes').router;
const app = express();
const PORT = 3000;

require('./libs/database/database');

middlewares.setupMiddleware(app);

app.use('/auth', authRoutes);
app.use('/librarian/', librarianRoutes);
app.use('/student/', studentRoutes);

app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));

exports.app = app;

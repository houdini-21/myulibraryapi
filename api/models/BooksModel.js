const mongoose = require('mongoose');

const BooksModel = mongoose.model('Books', {
    title: String,
    author: String,
    publishedYear: Number,
    genre: String,
    stock: Number,
});

module.exports = BooksModel;

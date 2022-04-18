const bookService = require('../services/book');

const getBooks = (req, res) => {
    bookService.getBooks(req, res);
};

const getBookById = (req, res) => {
    bookService.getBookById(req, res);
};

const createBook = (req, res) => {
    bookService.createBook(req, res);
};

const updateBook = (req, res) => {
    bookService.updateBook(req, res);
};

const deleteBook = (req, res) => {
    bookService.deleteBook(req, res);
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}
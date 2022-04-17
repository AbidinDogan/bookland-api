const authorService = require('../services/author');

const getAuthors = (req, res) => {
    authorService.getAuthors(req, res);
};

const getAuthorById = (req, res) => {
    authorService.getAuthorById(req, res);
};

const createAuthor = (req, res) => {
    authorService.createAuthor(req, res);
};

const updateAuthor = (req, res) => {
    authorService.updateAuthor(req, res);
};

const deleteAuthor = (req, res) => {
    authorService.deleteAuthor(req, res);
};

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}
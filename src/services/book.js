const Pool = require('pg').Pool;
const config = require('config');

const pool = new Pool({
    host: config.get('dbConnection.host'),
    port: config.get('dbConnection.port'),
    database: config.get('dbConnection.database'),
    user: config.get('dbConnection.userName'),
    password: config.get('dbConnection.password')
});

const getBooks = (request, response) => {
    pool.query('select * from Books order by id asc', (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).json(results.rows);
    });
};

const getBookById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('select * from Books where id= $1', [id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).json(results.rows);
    });
};

const createBook = (request, response) => {
    const {name, publishDate, authorId, publisherId} = request.body;

    pool.query('insert into Books ("name", "publishDate", "authorId", "publisherId") values($1, $2, $3, $4) returning id', [name, publishDate, authorId, publisherId], (error, results) => {
        if(error){
            throw error;
        }

        response.status(201).send(`Book added with id : ${results.rows[0].id}`);
    });
};

const updateBook = (request, response) => {
    const id = request.params.id;
    const {name, publishDate, authorId, publisherId} = request.body;

    pool.query('update Books set "name" = $1, "publishDate" = $2, "authorId" = $3, "publisherId" = $4 where id = $5', [name, publishDate, authorId, publisherId, id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).send(`Book modified with id: ${id}`);
    });
};

const deleteBook = (request, response) => {
    const id = request.params.id;

    pool.query('delete from Books where id= $1', [id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).send(`Book deleted with id: ${id}`);
    });
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}
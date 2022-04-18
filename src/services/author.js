const Pool = require('pg').Pool;
const config = require('config');

const pool = new Pool({
    host: config.get('dbConnection.host'),
    port: config.get('dbConnection.port'),
    database: config.get('dbConnection.database'),
    user: config.get('dbConnection.userName'),
    password: config.get('dbConnection.password')
});

const getAuthors = (request, response) => {
    pool.query('select * from Authors order by id asc', (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).json(results.rows);
    });
};

const getAuthorById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('select * from Authors where id= $1', [id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).json(results.rows);
    });
};

const createAuthor = (request, response) => {
    const {firstName, lastName} = request.body;

    pool.query('insert into Authors ("firstName", "lastName") values($1, $2) returning id', [firstName, lastName], (error, results) => {
        if(error){
            throw error;
        }

        response.status(201).send(`Author added with id : ${results.rows[0].id}`);
    });
};

const updateAuthor = (request, response) => {
    const id = request.params.id;
    const {firstName, lastName} = request.body;

    pool.query('update Authors set "firstName" = $1, "lastName" = $2 where id = $3', [firstName, lastName, id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).send(`Author modified with id: ${id}`);
    });
};

const deleteAuthor = (request, response) => {
    const id = request.params.id;

    pool.query('delete from Authors where id= $1', [id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).send(`Author deleted with id: ${id}`);
    });
};

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}
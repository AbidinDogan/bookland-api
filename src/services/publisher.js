const Pool = require('pg').Pool;
const config = require('config');

const pool = new Pool({
    host: config.get('dbConnection.host'),
    port: config.get('dbConnection.port'),
    database: config.get('dbConnection.database'),
    user: config.get('dbConnection.userName'),
    password: config.get('dbConnection.password')
});

const getPublishers = (request, response) => {
    pool.query('select * from publishers order by id asc', (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).json(results.rows);
    });
};

const getPublisherById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('select * from publishers where id= $1', [id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).json(results.rows);
    });
};

const createPublisher = (request, response) => {
    const {name, address} = request.body;

    pool.query('insert into publishers (name, address) values($1, $2) returning id', [name, address], (error, results) => {
        if(error){
            throw error;
        }

        response.status(201).send(`publisher added with id : ${results.rows[0].id}`);
    });
};

const updatePublisher = (request, response) => {
    const id = request.params.id;
    const {name, address} = request.body;

    pool.query('update publishers set name = $1, address = $2 where id = $3', [name, address, id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).send(`publisher modified with id: ${id}`);
    });
};

const deletePublisher = (request, response) => {
    const id = request.params.id;

    pool.query('delete from publishers where id= $1', [id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).send(`publisher deleted with id: ${id}`);
    });
};

module.exports = {
    getPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher
}
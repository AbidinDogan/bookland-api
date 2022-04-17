const express = require('express');
const bodyParser = require('body-parser');
const publisherRoutes = require('./routes/publisher');
const authorRoutes = require('./routes/author');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (request, response) => {
    response.json({info:'bookland-api created for crud operation with postgresql', tools: ['Nodejs', 'Express', 'Postgresql']});
});

app.use('/', publisherRoutes);
app.use('/', authorRoutes);

app.listen(port, () => {console.log(`App running on port ${port}.`)});
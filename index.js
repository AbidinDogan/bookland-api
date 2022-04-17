const express = require('express');
const bodyParser = require('body-parser');
const repo = require('./queries');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (request, response) => {
    response.json({info:'bookland-api created for crud operation with postgresql', tools: ['Nodejs', 'Express', 'Postgresql']});
});

app.get('/publishers', repo.getPublishers);
app.get('/publishers/:id', repo.getPublisherById);
app.post('/publishers', repo.createPublisher);
app.put('/publishers/:id', repo.updatePublisher);
app.delete('/publishers/:id', repo.deletePublisher);

app.listen(port, () => {console.log(`App running on port ${port}.`)});
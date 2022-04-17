const publisherService = require('../services/publisher');

const getPublishers = (req, res) => {
    publisherService.getPublishers(req, res);
};

const getPublisherById = (req, res) => {
    publisherService.getPublisherById(req, res);
};

const createPublisher = (req, res) => {
    publisherService.createPublisher(req, res);
};

const updatePublisher = (req, res) => {
    publisherService.updatePublisher(req, res);
};

const deletePublisher = (req, res) => {
    publisherService.deletePublisher(req, res);
};

module.exports = {
    getPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher
}
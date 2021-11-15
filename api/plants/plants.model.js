const db = require('../data/db-config.js');

function getAllPlants() {
    return db('plants as p')
}

module.exports = {
    getAllPlants,
};
const db = require('../data/db-config.js');

function getAllPlants() {
    return db('plants as p')
}

function getPlantById(plant_id) {
    return db('plants as p')
        .select('*')
        .where('p.plant_id', plant_id)
        .first();
}

function getPlantBy(filter, user_id) {
    return db('plants as p')
        .select('*')
        .where(filter, user_id);
}

async function addPlant(user_id, plant) {
    const [createdPlant] = await db('plants')
        .insert({...plant, user_id}, [
            "plant_id",
            "image_url",
            "light_requirement",
            "nickname",
            "species",
            "user_id",
            "water_frequency",
        ]);
    return createdPlant
}

module.exports = {
    addPlant,
    getPlantBy,
    getAllPlants,
    getPlantById,
};
const router = require('express').Router();
const Plants = require('./plants.model.js');
const { getDb, validateEmpty } = require('../middleware')
const { validateCreate } = require('./plant-middleware')

router.get('/', async (req, res) => {
    res.json(await Plants.getAllPlants())
})

router.get('/:plant_id', async (req, res, next) => {
    try {
        const plants = await Plants.getPlantById(req.params.plant_id)
        if (!plants) {
            res.json({ message: `Plant id ${req.params.plant_id} not found` })
        }
        res.json(plants)
    } catch {
        next()
    }
})

router.post('/create', validateEmpty, validateCreate, async (req, res, next) => {
    if (req.udb) {
        Plants.addPlant(req.udb.user_id, req.body)
            .then(plant => { res.status(201).json(plant) })
            .catch(next)
    } else {
        next()
    }
});

router.put('/update/:plant_id', validateEmpty, async (req, res, next) => {
    const { plant_id } = req.params;
    const [db] = await getDb(req);
    const changes = req.body;
    try {
        const updated = await Plants.updatePlant(plant_id, db.user_id, changes)
        if (updated) {
            res.json(updated);
        } else {
            next({
                message: "endpoint not updated",
            })
        }
    } catch {
        next()
    }
})

router.delete('/delete/:plant_id', async (req, res, next) => {
    const { plant_id } = req.params;
    const [db] = await getDb(req);
    
    try {
        const deleted = await Plants.deletePlant(plant_id, db.user_id)
        if (deleted) {
            res.json({
                message: `Plant id ${plant_id} has been deleted`,
            });
        } else {
            next({
                message: "endpoint not deleted",
            })
        }
    } catch {
        next()
    }
})

module.exports = router;

// const jwtDecode = require('jwt-decode')
const router = require('express').Router();
const Plants = require('./plants.model.js');
// const Users = require('../users/users.model');
const { validateEmpty } = require('../middleware')
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

router.post('/create', validateEmpty, validateCreate, async(req, res, next) => {
    // const { username } = jwtDecode(req.headers.authorization);
    // const [udb]  = await Users.findBy({ username });
    if (req.udb) {
        Plants.addPlant(req.udb.user_id, req.body)
        .then(plant => {res.status(201).json(plant)})
        .catch(next)
    } else {
        next()
}

});

module.exports = router;

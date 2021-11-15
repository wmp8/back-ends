const router = require('express').Router();
const Plants = require('./plants.model.js');

router.get('/', async (req, res) => {
    res.json(await Plants.getAllPlants())
})

router.post('/create',  (req, res, next) => {
    const { user_id } = req.body;
 

    Plants.add({ user_id })
        .then(newUser => {
            res.status(201).json({
                message: `You have successfully created an account with username ${newUser.username}`
            })
        })
        .catch(next)
});

module.exports = router;

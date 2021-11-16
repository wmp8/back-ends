const Plants = require('./plants.model');
const { getDb } = require('../middleware');

const validateCreate = async (req, res, next) => {
    const [udb] = await getDb(req);
    const { nickname } = req.body;
    const user_id = udb.user_id;
    if (udb) {
        const [plant] = await Plants.getPlantBy({ nickname, user_id });
        try {
            if (!plant) {
                req.udb = udb
                req.plant = plant;
                next();
            } else {
                return next({
                    status: 401,
                    message: 'This plant already on your list'
                });
            }
        } catch (err) {
            next(err)
        }
    } else {
        next()
    }
};

module.exports = {
    validateCreate,
}

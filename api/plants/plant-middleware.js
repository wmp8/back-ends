const jwtDecode = require('jwt-decode');
const Plants = require('./plants.model');
const Users = require('../users/users.model');


const validateCreate = async (req, res, next) => {
    const { username } = jwtDecode(req.headers.authorization);
    const [udb] = await Users.findBy({ username });
    const { nickname } = req.body;
    const user_id = udb.user_id;

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
};

module.exports = {
    validateCreate,
}
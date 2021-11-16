const Users = require('../users/users.model');
const jwtDecode = require('jwt-decode')

function isNotEmptyString(str) {
    return typeof str === 'string' && str.trim().length > 0
}

async function getDb(req) {
    const { username } = jwtDecode(req.headers.authorization);
    return await Users.findBy({ username });
}

const validateEmpty = (req, res, next) => {
    const { nickname, water_frequency } = req.body;
    if (isNotEmptyString(nickname) && isNotEmptyString(water_frequency)) {
        next()
    } else {
        return next(({
            status: 401,
            message: 'name and water is required'
        }));
    }
};

module.exports = {
    getDb,
    isNotEmptyString,
    validateEmpty,
}

function isNotEmptyString(str) {
    return typeof str === 'string' && str.trim().length > 0
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
    isNotEmptyString,
    validateEmpty,
}
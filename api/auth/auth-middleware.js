const User = require('../users/users.model');
const { phone } = require('phone');
const { lowerCase } = require('lower-case')

function isNotEmptyString(str) {
    return typeof str === 'string' && str.trim().length > 0
}

const validateEmpty = (req, res, next) => {
    const { username, password } = req.body;
    if (isNotEmptyString(username) && isNotEmptyString(password)) {
        next()
    } else {
        return next(({
            status: 401,
            message: 'username and password required'
        }));
    }
};

const validateLogin = async (req, res, next) => {
    const { username } = req.body;
    lowerCase(username)
    const [user] = await User.findBy({ username });
    try {
        if (!user) {
            return next({
                status: 401,
                message: 'invalid credentials'
            });
        } else {
            req.user = user;
            next();
        }
    } catch (err) {
        next(err)
    }
};

const validateRegister = async (req, res, next) => {
    const { username } = req.body;
    const [user] = await User.findBy({ username: lowerCase(username) });
    try {
        if (!user) {
            req.user = user;
            next();
        } else {
            return next({
                status: 401,
                message: 'username taken'
            });
        }
    } catch (err) {
        next(err)
    }
};

const validatePhone = (req, res, next) => {
    const { isValid } = phone(req.body.phone)
    if (isValid) {
        next();        
    } else {
        return next({
            status: 401,
            message: 'invalid phone number'
        });
    }
}
module.exports = {
    validateEmpty,
    validateLogin,
    validatePhone,
    validateRegister,
    isNotEmptyString,
};

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { validateEmpty, validateLogin, validateRegister, validatePhone } = require('./auth-middleware');

const Users = require('../users/users.model');
const tokenBuilder = require("./token-builder.js");

router.post('/signup', validateEmpty, validateRegister, validatePhone, (req, res, next) => {
    const { username, password, phone } = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(password, rounds);

    Users.add({ username, password: hash, phone })
        .then(newUser => {
            res.status(201).json({
                message: `You have successfully created an account with username ${newUser.username}`
            })
        })
        .catch(next)
});

router.post('/login', validateEmpty, validateLogin, (req, res, next) => {
    let { password } = req.body;
    if (bcrypt.compareSync(password, req.user.password)) {
        const token = tokenBuilder(req.user);
        res.json({
            message: `Welcome back ${req.user.username}`,
            token,
            user_id:req.user.user_id,
        });
    } else {
        next({
            status: 401,
            message: 'invalid credentials'
        });
    }
});

module.exports = router;

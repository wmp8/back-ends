const router = require('express').Router();
const Users = require('./users.model');

router.get('/users', async (req, res) => {
  res.json(await Users.getAllUsers())
})

router.get('/users/:user_id', async (req, res) => {
    const {user_id, username, phone } = await Users.findById(req.params.user_id)
    res.json({ user_id, username, phone })    
})


module.exports = router;

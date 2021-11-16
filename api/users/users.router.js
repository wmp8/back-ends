const router = require('express').Router();
const Users = require('./users.model');
const bcrypt = require('bcryptjs');
const { isNotEmptyString, validatePhone } = require('../auth/auth-middleware');
const { getDb } = require('../middleware');

router.get('/', async (req, res) => {
  res.json(await Users.getAllUsers())
})

router.get('/:user_id', async (req, res) => {
  try {
    const { user_id, username, phone } = await Users.findById(req.params.user_id)
    res.json({ user_id, username, phone })
  } catch {
    res.json({ message: `user id ${req.params.user_id} not found` })
  }
})

router.put('/update', validatePhone, async (req, res, next) => {
  const { password, phone } = req.body;
  const [db] = await getDb(req);
  let newPassword = db.password;
  let newPhone = db.phone;

  if (db) {
    if (isNotEmptyString(password)) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
      newPassword = bcrypt.hashSync(password, rounds);
    }

    if (isNotEmptyString(phone)) {
      newPhone = phone;
    }

    try {
      await Users.update(
        db.username, { password: newPassword, phone: newPhone }
      )
      res.status(200).json({
        message: 'Your submission has been updated'
      })
    } catch {
      res.json({ message: `Entry is not being updated` })
    }
  } else {
    next()
  }
});

module.exports = router;

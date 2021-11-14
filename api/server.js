const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
// const Users = require('./users/users.model')
const authRouter = require('./auth/auth-router.js');

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

// server.get('/api/users', async (req, res) => {
//   res.json(await Users.getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await Users.insertUser(req.body))
// })

 server.use('/api/auth', authRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server

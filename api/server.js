const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users.router');
const plantRouter = require('./plants/plants.router.js');
const restricted = require('./middleware/restricted')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())


 server.use('/api/plants', restricted,  plantRouter);
 server.use('/api/users', restricted,  userRouter);
 server.use('/api/auth', authRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server

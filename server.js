const express = require('express');
const helmet = require('helmet');

const DishesRouter = require('./dishes/dishesRouter.js');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/dishes', DishesRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Recipe Book API!</h2>`)
  });

module.exports = server;
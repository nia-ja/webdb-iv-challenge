const express = require('express');
const helmet = require('helmet');

const DishesRouter = require('./dishes/dishesRouter.js');
const RecipesRouter = require('./recipes/recipesRouter.js');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/dishes', DishesRouter);
server.use('/api/recipes', RecipesRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Recipe Book API!</h2>`)
  });

module.exports = server;
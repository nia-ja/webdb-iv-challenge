const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    getDishes,
    addDish,
    getDishById
};

// `getDishes()`: should return a list of all dishes in the database.
function getDishes() {
  return db('dishes');
}

// `addDish(dish)`: should add the **dish** to the database and return the `id` of the new **dish**.
function addDish(dish) {
    return db('dishes')
      .insert(dish)
      .then(ids => ({id: ids[0]}));
}

// `getDishById(id)`: should return the **dish** with the provided `id` and include a list of the related recipes.
function getDishById(id) {
    return db.select('dishes.id', 'dishes.name as dish', 'recipes.name as recipe').from('dishes').leftJoin('recipes', 'dishes.id', 'recipes.dish_id').where('dishes.id', Number(id));
}
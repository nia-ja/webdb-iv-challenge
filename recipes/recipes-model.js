const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    getRecipes,
    addRecipe
};

// `getRecipes()`: should return a list of all recipes in the database including the **dish** they belong to.
function getRecipes() {
    return db.select('r.id as id', 'r.name as name', 'd.name as dish').from('recipes as r').innerJoin('dishes as d', 'r.dish_id', 'd.id');
}

// `addRecipe(recipe)`: should add a **recipe** to the database and return the `id` of the new **recipe**.
function addRecipe(recipe) {
    return db('recipes')
      .insert(recipe)
      .then(ids => ({id: ids[0]}));
}
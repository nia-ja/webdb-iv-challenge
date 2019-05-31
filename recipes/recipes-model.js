const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    getRecipes,
    getRecipeById,
    addRecipe,
    getRecipe
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

// `getRecipe(id)` to your data access library that should return the recipe with the provided `id`. The recipe should include:
//  - name of the dish.
//  - name of the recipe.
//  - the list of ingredients with the quantity.

// v1
function getRecipeById(id) {
    return db
        .select('r.id', 'd.name as dish', 'r.name as recipe', 'ri.quantity', 'i.name as ingredient')
        .from('recipes_ingredients as ri')
        .join('recipes as r', 'r.id', 'ri.recipe_id')
        .join('dishes as d', 'r.dish_id', 'd.id')
        .leftJoin('ingredients as i', 'ri.ingredient_id', 'i.id')        
        .where('ri.recipe_id', Number(id));
}

// v2
async function getRecipe(id) {
    // 'r.id', 'd.name as dish', 'r.name as recipe'
    const rec =  await db.select('r.id', 'd.name as dish', 'r.name as recipe')
        .from('recipes as r')
        .join('dishes as d', 'd.id', 'r.dish_id')
        .where('r.id', Number(id));
    // 'ri.quantity', 'i.name as ingredient'
    const ingr = await db.select('ri.quantity', 'i.name as ingredient')
        .from('recipes_ingredients as ri')
        .join('ingredients as i', 'ri.ingredient_id', 'i.id')
        .where('ri.recipe_id', Number(id));
    const result = {...rec[0], ingredients: ingr};
    return result;
}
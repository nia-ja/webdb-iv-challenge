const express = require('express');

const Recipes  = require('./recipes-model.js');

const router = express.Router();

// /api/recipes

// GET all recipes
// returns an array of recipes
router.get('/', async (req, res) => {
    try {
      const recipes = await Recipes.getRecipes();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({
        message: "The recipes information could not be retrieved", error: error
      });
    }
});

// POST
// returns an id of the new recipe
router.post('/', async (req, res) => {
    try {
        if (req.body.name === "") {
            res.status(400).json({ message: "Please provide name for the recipe." });
        } else {
            const recipe = await Recipes.addRecipe(req.body);
            res.status(201).json(recipe);
        }
    } catch (error) {
        res.status(500).json({ message: "There was an error while saving the recipe to the database", error: error });
    }
})

module.exports = router;
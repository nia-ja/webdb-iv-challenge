const express = require('express');

const Dishes  = require('./dishes-model.js');

const router = express.Router();

// /api/dishes

// GET all dishes
// returns an array of dishes
router.get('/', async (req, res) => {
    try {
      const dishes = await Dishes.getDishes();
      res.status(200).json(dishes);
    } catch (error) {
      res.status(500).json({
        message: "The dishes information could not be retrieved", error: error
      });
    }
});

// GET dish by ID
// returns dish object with value for id, name and recipes names for this dish (an array)
router.get('/:id', async (req, res) => {
    try {
        const dish = await Dishes.getDishById(req.params.id);
        if (dish.length) {
            const recipesArr = dish.map(obj => {
                const recipe = {name: obj.recipe};
                return recipe;
            })
            const dishResult = {id: dish[0].id, name: dish[0].dish, recipes: recipesArr};
            res.status(200).json(dishResult);
        } else {
            res.status(404).json({ message: "The dish with the specified ID does not exist." })
        }
    } catch (error) {
        res.status(500).json({ message: "The dish information could not be retrieved", error: error });
    }
})

// POST
// returns an id of the new dish (just number, not a key:value pair!)
router.post('/', async (req, res) => {
    try {
        if (req.body.name === "") {
            res.status(400).json({ message: "Please provide name for the dish." });
        } else {
            const post = await Dishes.addDish(req.body);
            res.status(201).json(post);
        }
    } catch (error) {
        res.status(500).json({ message: "There was an error while saving the dish to the database", error: error });
    }
})

module.exports = router;
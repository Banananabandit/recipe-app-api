const express = require('express');
const router = express.Router();
const { validate, Recipe } = require('../models/recipe');
const { Ingredient } = require('../models/ingredients');

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.result(400).send(result.error.details[0].message);

    const ingredient = await Ingredient.findById(req.body.ingredients);
    console.log(ingredient);
    if (!ingredient) return res.status(400).send('Invalid ingredient');

    let recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        ingredients: {
            _id: ingredient._id,
            name: ingredient.ingredients  // maybe here I will have a problem 
        }
    });

    recipe = await recipe.save();
    res.send(recipe);
});

router.put('/:id', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    const recipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description
        },
        { new: true });
    if (!recipe) return res.status(404).send(console.log('Recipe with this id doesnt exist!'));
    res.send(recipe);
});

router.get('/', async (req, res) => {
    const result = await Recipe.find();
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send(console.log('Recipe with this id doesnt exist!'));
    res.send(recipe);
});

router.delete('/:id', async (req, res) => {
    const result = await Recipe.findByIdAndDelete(req.params.id);
    if (!result) return res.status(400).send(console.log('Recipe with this id doesnt exists!'));
    res.send(result);
});

module.exports = router;

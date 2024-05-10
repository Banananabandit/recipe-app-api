const mongoose = require('mongoose');
const Joi = require('joi');
const { ingredientsSchema } = require('./ingredients');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 2,
        maxlenght: 255
    },
    description: {
        type: String,
        required: true,
        minlenght: 2,
        maxlenght: 255
    },
    // This might not work as not used for the lists
    ingredients: {
        type: ingredientsSchema,
        required: true
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

function validateRecipe(recipe) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(255).required(),
        ingredient: Joi.string().required()
    });

    return schema.validate({
        name: recipe.name,
        description: recipe.description,
        ingredient: recipe.ingredient
    });
};

module.exports.Recipe = Recipe;
module.exports.validate = validateRecipe;
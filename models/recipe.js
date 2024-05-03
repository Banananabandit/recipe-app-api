const mongoose = require('mongoose');
const Joi = require('joi');

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
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

function validateRecipe(recipe) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(255).required()
    });

    return schema.validate({
        name: recipe.name,
        description: recipe.description
    });
};

module.exports.Recipe = Recipe;
module.exports.validate = validateRecipe;
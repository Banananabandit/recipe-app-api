const mongoose = require('mongoose');
const Joi = require('joi');

const ingredientsSchema = new mongoose.Schema({
    ingredients: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20
    }
});

const Ingredient = mongoose.model("Ingredient", ingredientsSchema);

function validateIngredient(ingredient) {
    const schema = {
        ingredient: Joi.string.min(5).max(20).required()
    };

    return Joi.validate(ingredient, schema);
}

exports.ingredientsSchema = ingredientsSchema;
exports.Ingredient = Ingredient;
exports.validate = validateIngredient;
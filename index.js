const express = require('express');
const app = express();
const mongoose = require('mongoose');
const home = require('./routes/home');
const recipes = require('./routes/recipes');

mongoose.connect('mongodb://localhost/recipes')
    .then(console.log('Successfully connected to RecipesApp DB'))
    .catch(err => console.error('Could not connect to the DB', err));

app.use(express.json());
app.use('/', home);
app.use('/api/recipes', recipes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

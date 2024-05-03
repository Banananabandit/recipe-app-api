const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This will be your final place of resting");
});

module.exports = router;
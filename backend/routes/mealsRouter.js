const express = require ('express');
const router = express.Router();
const meal = require('../models/meal')();


// GET /:id  ===> Fetch
router.get('/:id', async (req, res, next) => {
    try {
        const result = await meal.one(req.params.id);
        res.status(200).send(result);
        meal.close();
    } catch(e) {
        meal.close();
        next(e.name + ', ' + e.message); // next(..) mit Argument geht direkt zur (letzten) Error-Behandlung (func. mit 4 Args.).
    }
});
 
// POST /:id ===> Insert
router.post('/insert', (req, res, next) => {
    next();
});

// PUT /:id ===> Update
router.put('/update/:id', (req, res, next) => {
    next();
});

// DELETE /:id ===> Delete
router.delete('/delete/:id', (req, res, next) => {
    next();
});


module.exports = router;

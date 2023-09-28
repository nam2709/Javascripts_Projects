const express = require('express');

const {
    httpgetAlldepreciationperiod,
    // httpAddNewdepreciationperiod,
    // httpDeletedepreciationperiod
} = require('./depreciationperiod.controller');

const depreciationperiodrouter = express.Router()

depreciationperiodrouter.get('/', httpgetAlldepreciationperiod);
// depreciationperiodrouter.post('/', httpAddNewdepreciationperiod);
// depreciationperiodrouter.delete('/:id', httpDeletedepreciationperiod);


module.exports = depreciationperiodrouter
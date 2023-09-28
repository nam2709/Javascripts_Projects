const { 
    getAllDepreciationperiod,
 } = require('../../models/depreciationperiod.models');

async function httpgetAlldepreciationperiod(req, res) {
    return res.status(200).json(await getAllDepreciationperiod());
}

module.exports = {
    httpgetAlldepreciationperiod, 
};
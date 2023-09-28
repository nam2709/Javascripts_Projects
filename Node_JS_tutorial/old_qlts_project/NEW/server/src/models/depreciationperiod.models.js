const depreciationperiodDatabase =  require('./depreciationperiod.mongo');
// const planets = require('./planets.mongo');

// const depreciationperiods = new Map();

const depreciationperiod = {
    name: 'Admin',
    created_by: 'Admin',
    updated_by: 'Admin',
    updated_at: 'Sep 20, 2023',
    created_at: 'Sep 20, 2023'
};

saveDepre(depreciationperiod);
// launches.set(launch.flightNumber, launch);

async function getAllDepreciationperiod() {
    return await depreciationperiodDatabase
        .find({},{'__v':0});
}

async function saveDepre(depreciation) {

    await depreciationperiodDatabase.updateOne({
        name: depreciation.name,
    },  depreciation, {
        upsert: true,
    }); 
// 1 st is checking, 2 nd is get the launch
}

module.exports = {
    getAllDepreciationperiod,
}
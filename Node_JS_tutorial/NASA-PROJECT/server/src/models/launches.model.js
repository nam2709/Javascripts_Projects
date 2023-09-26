const launchesDatabase =  require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'Nasa'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);
// launches.set(launch.flightNumber, launch);

async function getAllLaunches() {
    return await launchesDatabase
        .find({},{'_id':0, '__v':0});
}

async function getlatesfightnumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet){
        throw new Error('No matching planet');
    } 

    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    },  launch, {
        upsert: true,
    }); 
// 1 st is checking, 2 nd is get the launch
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getlatesfightnumber() + 1;
    const newLaunch = Object.assign(launch, {
        customers: ['Zero to Mastery', 'Nasa'],
        upcoming: true,
        success: true, 
        flightNumber: newFlightNumber
    });

    await saveLaunch(newLaunch);
}


async function exitsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches, 
    scheduleNewLaunch,
    exitsLaunchWithId, 
    abortLaunchById
}